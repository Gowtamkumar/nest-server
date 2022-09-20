import { IsAlphanumeric, IsNotEmpty, Length } from "class-validator";

export class UpdatePasswordDto {
	
	@IsNotEmpty()
	@IsAlphanumeric()
	currentPassword: string;

	// @ApiProperty({ example: '1234567' })
	// @Matches(passwordRegex, { message: 'Password too weak' })
	@IsNotEmpty()
	@IsAlphanumeric()
	@Length(8, 20)
	newPassword: string;

}