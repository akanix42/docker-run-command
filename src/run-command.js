import NodeSsh from '@nathantreid/node-ssh';

const config = {
  server: {
    host: process.env.SSH_HOST,
    username: process.env.SSH_USERNAME,
    password: process.env.SSH_PASSWORD,
  },
  scriptDir: process.env.SCRIPT_DIR,
};

export default async function runCommand(command, args) {
  const client = new NodeSsh();
  await client.connect(config.server);
  const result = await client.execCommand(`${config.scriptDir}/${command}`, { cwd: config.scriptDir, options: { env: args } });

  if (result.code === 0) {
    return { out: result.stdout, err:  result.stderr };
  } else {
    throw new Error({ out: result.stdout, err:  result.stderr });
  }
}
