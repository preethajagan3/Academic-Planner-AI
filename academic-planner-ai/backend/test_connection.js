const mongoose = require('mongoose');

// Test different MongoDB connection strings
const connectionStrings = [
    // SRV format (current)
    'mongodb+srv://preetha_3:preetha_3@cluster1.s5hcvx6.mongodb.net/academic_planner?retryWrites=true&w=majority',

    // Standard format (fallback)
    'mongodb://preetha_3:preetha_3@cluster1-shard-00-00.s5hcvx6.mongodb.net:27017,cluster1-shard-00-01.s5hcvx6.mongodb.net:27017,cluster1-shard-00-02.s5hcvx6.mongodb.net:27017/academic_planner?ssl=true&replicaSet=atlas-xxxxx-shard-0&authSource=admin&retryWrites=true&w=majority'
];

async function testConnection(uri, index) {
    console.log(`\n--- Testing Connection ${index + 1} ---`);
    console.log(`URI: ${uri.substring(0, 30)}...`);

    try {
        const conn = await mongoose.createConnection(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000
        }).asPromise();

        console.log(`✅ SUCCESS: Connected to ${conn.host}`);
        await conn.close();
        return true;
    } catch (error) {
        console.log(`❌ FAILED: ${error.message}`);
        return false;
    }
}

async function runTests() {
    console.log('Testing MongoDB Connections...\n');

    for (let i = 0; i < connectionStrings.length; i++) {
        const success = await testConnection(connectionStrings[i], i);
        if (success) {
            console.log('\n✅ Found working connection string!');
            console.log('Update your .env file with this connection string.');
            break;
        }
    }

    process.exit(0);
}

runTests();
