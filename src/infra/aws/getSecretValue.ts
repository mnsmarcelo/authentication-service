import {
  GetSecretValueCommand,
  SecretsManagerClient,
} from "@aws-sdk/client-secrets-manager";

export const getSecretValue = async (secretName: string) => {
  const client = new SecretsManagerClient();
  const response = await client.send(
    new GetSecretValueCommand({
      SecretId: secretName,
    }),
  );

  if (response.SecretString) {
    const responseJson = JSON.parse(response.SecretString);
    return responseJson;
  }

  if (response.SecretBinary) {
    return response.SecretBinary;
  }
};