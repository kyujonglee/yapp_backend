import app from './app';

const PORT = process.env.PORT || 4000;

const handleListening = () => console.log(`starting server ${PORT}`);

app.listen(PORT, handleListening);
