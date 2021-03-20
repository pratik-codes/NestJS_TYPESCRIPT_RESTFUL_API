import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './DTOs/auth-credentials.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}

  async SignUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return await this.userRepository.signUp(authCredentialsDto);
  }

  async SignIn(authCredentialsDto: AuthCredentialsDto) {
    const username = await this.userRepository.validateUser(authCredentialsDto);
    if (!username) {
      throw new UnauthorizedException(username);
    }
  }
}
