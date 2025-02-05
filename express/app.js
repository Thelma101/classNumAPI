import app from './index.js';
import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Application Server is running on PORT: ${PORT}`);
});