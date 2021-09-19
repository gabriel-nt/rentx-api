import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ResetPasswordUserUseCase from './ResetPasswordUseCase';

class ResetPasswordUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { token } = request.query;
    const { password } = request.body;

    const resetPasswordUserUseCase = container.resolve(
      ResetPasswordUserUseCase,
    );

    await resetPasswordUserUseCase.execute({
      password,
      token: String(token),
    });

    return response.send();
  }
}

export { ResetPasswordUserController };
