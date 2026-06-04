const express = require('express');
const cors = require('cors');
const logRoutes = require('./routes/logRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/log', logRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
