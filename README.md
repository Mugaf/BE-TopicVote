this is a simple RESTFULL API for in-memory reddit topic used.

how to run:
1.install npm first(it is required)
2.clone this git repository into your pc
3.go to inside project directory and run "npm install"
4.start the api server with "npm start"
5.the API ready to use.

testing it with this documentation from apiary:
copy this format below and paste it into your apiary editor.
FORMAT: 1A
HOST: https://topicreddit.herokuapp.com/

# Reddit Topic

Documentation for API MUGAF reddit topic on github.

## Topic [/topic]

### List All Topics [GET /api/topic]

+ Response 200 (application/json)

        {
            "message": "data retrieved!",
            "success": true,
            "count": 1,
            "data": [
                {
                    "id": "wcz1ojmtjv3i7lhs",
                    "title": "Omnis quia ut.",
                    "description": "Dolore ut eius doloremque repudiandae.",
                    "upvote": 0,
                    "downvote": 0
                }
            ]
        }

### Create a New Topic [POST /api/topic]

it will create automatically with faker() npm package if you are not define 
the title or description. 

+ Request (application/json)

        {
            "title":"code vs depressed",
            "description":"it a same thing but depend on each people how they facing it."
        }

+ Response 200 (application/json)


    + Body

            {
                "message": "data created!",
                "success": true
            }

### Update a Topic [PUT /api/topic]

it will update a topic base on each ID's

+ Request (application/json)

        {
            "id": "",
            "title": "",
            "description": ""
        }
        
+ Response 200 (application/json)

        {
            "message": "data updated!",
            "success": true,
            "error": false,
            "data": [
                {
                    "id": "wcz1ojmtjv3i7lhs",
                    "title": "Romusa",
                    "description": "kerja paksa zaman penjajahan belanda",
                    "upvote": 0,
                    "downvote": 0
                },
                {
                "id": "wcz1ojmtjv3id6ri",
                    "title": "code vs depressed",
                    "description": "it a same thing but depend on each people how they facing it.",
                    "upvote": 0,
                    "downvote": 0
                }
            ]
        }

### Downvote a Topic [PUT /api/topic/downvote]

+ Request (application/json)

        {
            "id": "wcz1ojmtjv3id6ri"
        }

+ Response 200 (application/json)

        {
            "message": "wcz1ojmtjv3id6ri downvoted!"
        }
        
### Upvote a Topic [PUT /api/topic/upvote]

+ Request (application/json)

        {
            "id": "wcz1ojmtjv3id6ri"
        }

+ Response 200 (application/json)

        {
            "message": "wcz1ojmtjv3id6ri upvoted!"
        }