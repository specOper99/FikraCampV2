import * as express from 'express';
import { join } from 'path';

const app = express();

app.use('/files', express.static(join(__dirname, '/files')))

app.get('/:number', (req: express.Request, res: express.Response) => {
    res.json({
        message: `Hello Number ${req.params.number}`,
    });
})

app.use('/', (req: express.Request, res: express.Response) => {
    res.json({
        message: 'Hello World'
    });
})

app.listen(12000, () => {
    console.log('Server started on port 12000');
});