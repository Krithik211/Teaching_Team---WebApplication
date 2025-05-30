import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Tutorial } from "../entity/Tutorial";

export class TutorialController {
  private tutorialRepository = AppDataSource.getRepository(Tutorial);

  /**
   * Retrieves all tutorials from the database
   * @param request - Express request object
   * @param response - Express response object
   * @returns JSON response containing an array of all tutorials
   */
  async all(request: Request, response: Response) {
    const tutorials = await this.tutorialRepository.find();
    return response.json(tutorials);
  }

  /**
   * Retrieves a single tutorial by its ID
   * @param request - Express request object containing the tutorial ID in params
   * @param response - Express response object
   * @returns JSON response containing the tutorial if found, or 404 error if not found
   */
  async one(request: Request, response: Response) {
    const id = parseInt(request.params.id);
    const tutorial = await this.tutorialRepository.findOne({
      where: { id },
    });

    if (!tutorial) {
      return response.status(404).json({ message: "Tutorial not found" });
    }
    return response.json(tutorial);
  }

  /**
   * Creates a new tutorial in the database
   * @param request - Express request object containing tutorial details in body
   * @param response - Express response object
   * @returns JSON response containing the created tutorial or error message
   */
  async save(request: Request, response: Response) {
    const { title, description, content, difficulty, author } = request.body;

    const tutorial = Object.assign(new Tutorial(), {
      title,
      description,
      content,
      difficulty,
      author,
    });

    try {
      const savedTutorial = await this.tutorialRepository.save(tutorial);
      return response.status(201).json(savedTutorial);
    } catch (error) {
      return response
        .status(400)
        .json({ message: "Error creating tutorial", error });
    }
  }

  /**
   * Deletes a tutorial from the database by its ID
   * @param request - Express request object containing the tutorial ID in params
   * @param response - Express response object
   * @returns JSON response with success message or 404 error if tutorial not found
   */
  async remove(request: Request, response: Response) {
    const id = parseInt(request.params.id);
    const tutorialToRemove = await this.tutorialRepository.findOne({
      where: { id },
    });

    if (!tutorialToRemove) {
      return response.status(404).json({ message: "Tutorial not found" });
    }

    await this.tutorialRepository.remove(tutorialToRemove);
    return response.json({ message: "Tutorial removed successfully" });
  }

  /**
   * Updates an existing tutorial's information
   * @param request - Express request object containing tutorial ID in params and updated details in body
   * @param response - Express response object
   * @returns JSON response containing the updated tutorial or error message
   */
  async update(request: Request, response: Response) {
    const id = parseInt(request.params.id);
    const { title, description, content, difficulty, author } = request.body;

    let tutorialToUpdate = await this.tutorialRepository.findOne({
      where: { id },
    });

    if (!tutorialToUpdate) {
      return response.status(404).json({ message: "Tutorial not found" });
    }

    tutorialToUpdate = Object.assign(tutorialToUpdate, {
      title,
      description,
      content,
      difficulty,
      author,
    });

    try {
      const updatedTutorial = await this.tutorialRepository.save(
        tutorialToUpdate
      );
      return response.json(updatedTutorial);
    } catch (error) {
      return response
        .status(400)
        .json({ message: "Error updating tutorial", error });
    }
  }

  /**
   * Deletes all tutorials from the database
   * @param request - Express request object
   * @param response - Express response object
   * @returns JSON response with success message
   */
  async removeAll(request: Request, response: Response) {
    await this.tutorialRepository.clear();
    return response.json({ message: "All tutorials removed successfully" });
  }

  /**
   * Searches for tutorials by title
   * @param request - Express request object containing the title query parameter
   * @param response - Express response object
   * @returns JSON response containing an array of matching tutorials
   */
  async findByTitle(request: Request, response: Response) {
    const title = request.query.title as string;
    if (!title) {
      return response
        .status(400)
        .json({ message: "Title query parameter is required" });
    }

    const tutorials = await this.tutorialRepository
      .createQueryBuilder("tutorial")
      .where("tutorial.title LIKE :title", { title: `%${title}%` })
      .getMany();

    return response.json(tutorials);
  }
}
