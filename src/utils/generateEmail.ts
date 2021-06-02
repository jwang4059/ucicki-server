export const genForgotPasswordEmail = (name: string, token: string): string => {
	return `
        <div>
            <h1>Reset Your password</h1>

            <p>Hello, ${name}!</p>
            <p>Someone recently requested a password reset for your UCI Circkle K account. </p>
            <p>If you did not request a password reset, you can ignore this email.</p>
            <p>Please click the link below to reset your password. <strong>This link is only valid for two hours</strong></p>
            <a href="${process.env.HOST}/change-password/${token}" target="_blank rel="noopener noreferrer"">Reset my password</a>

            <p>Thank you for using our services today,</p>
            <p>UCI Circle K Technology Team</p>
        </div>
    `;
};
