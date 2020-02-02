const requiredVariables = ['TOKEN'];
const missingVariables = requiredVariables.filter(variable => !process.env[variable]);

if (missingVariables.length) {
  missingVariables.forEach(variable =>
    console.error(`${variable} environment variable is required but was not specified`)
  );
  process.exit(1);
}

const { PORT = 3000, TOKEN } = process.env;

module.exports = {
  port: PORT,
  token: TOKEN
};
