db.createUser({
    user: "admin",
    pwd: "adminpassword",
    roles: [{ role: "userAdminAnyDatabase", db: "admin" }, "readWriteAnyDatabase"]
});

db = db.getSiblingDB('hidden_heritage');

db.feedbacks.insertMany([
    {
        "name": "Amit Patel",
        "email": "amit@example.com",
        "rating": 5,
        "message": "The trip to Bateshwar was eye-opening! Never knew such history existed.",
        "createdAt": new Date()
    },
    {
        "name": "Sarah Jones",
        "email": "sarah@test.com",
        "rating": 4,
        "message": "Loved the ravines, but we need more rest stops.",
        "createdAt": new Date()
    }
]);

db.stories.insertMany([
    {
        "site_slug": "bateshwar-temples",
        "content_blocks": [
            {
                "type": "text",
                "content": "Walking through Bateshwar feels like stepping back in time. The silence is profound."
            },
            {
                "type": "quote",
                "content": "These stones speak of a glory long forgotten."
            }
        ],
        "images_meta": [
            {
                "url": "/assets/bateshwar_detail.jpg",
                "alt": "Intricate carvings on Bateshwar temples",
                "photographer": "Heritage Hunter"
            }
        ]
    }
]);
