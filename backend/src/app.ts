import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
const swaggerDocument = YAML.load(__dirname + '/docs/auth.yaml');

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); 