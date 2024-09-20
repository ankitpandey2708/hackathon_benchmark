const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://nitink:lfWMKq36tusOsYt1@cluster0.gqudy.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB');
        // Your code here
    })
    .catch((error) => {
        console.error('Failed to connect to MongoDB:', error);
    });

    //lfWMKq36tusOsYt1