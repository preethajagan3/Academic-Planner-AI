const { MongoClient } = require('mongodb');
const dns = require('dns');

// Set DNS servers to Google's public DNS
dns.setServers(['8.8.8.8', '8.8.4.4']);

const uri = 'mongodb+srv://preetha_3:preetha_3@cluster1.s5hcvx6.mongodb.net/academic_planner?retryWrites=true&w=majority';

async function testConnection() {
    console.log('Testing MongoDB connection with Google DNS...\n');

    const client = new MongoClient(uri, {
        serverSelectionTimeoutMS: 10000,
        socketTimeoutMS: 10000,
    });

    try {
        console.log('Attempting to connect...');
        await client.connect();
        console.log('✅ SUCCESS: Connected to MongoDB!');

        // Test database access
        const db = client.db('academic_planner');
        const collections = await db.listCollections().toArray();
        console.log(`Database has ${collections.length} collections`);

        await client.close();
        console.log('\n✅ Connection test passed!');
        process.exit(0);
    } catch (error) {
        console.error('❌ FAILED:', error.message);
        console.error('\nFull error:', error);
        process.exit(1);
    }
}

testConnection();
