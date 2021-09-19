import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { hash } from 'bcryptjs';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordUserUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,

    @inject('UsersRepository') private usersRepository: IUsersRepository,

    @inject('DayjsDateProvider') private dateProvider: IDateProvider,
  ) {}

  async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.usersTokensRepository.findByRefreshToken(
      token,
    );

    if (!userToken) {
      throw new AppError('Token invalid!');
    }

    if (
      this.dateProvider.compareIfBefore(
        userToken.expires_date,
        this.dateProvider.dateNow(),
      )
    ) {
      throw new AppError('Token expired');
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    user.password = await hash(password, 8);

    await this.usersRepository.create(user);

    await this.usersTokensRepository.deleteById(userToken.id);
  }
}

export default ResetPasswordUserUseCase;
