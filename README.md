# Crescendo Collective - Frontend Skill Test

## Goals

For this javascript project we've provided a recipe API with two endpoints. With this API you'll need to complete the following objectives.

- Basic App development
  | Status | Item | Goal | Notes | Date Complete? |
  | ------------- |:-------------:| --------- | --------- | ---------: |
  | done | 1 | develop light and dark modes | used material-ui's theme to do so | 07/23/2021 |
  | done | 2 | create a user login | build this so that a user can leave comments, like a recipe, add a recipe, edit a recipe (user has been created) | 07/23/2021 |
  | done | 3 | since we have a user we need Redux, Sagas, and Persist | created all 3 of these to persist data and write data to state asynchronous thru sagas | 07/23/2021 |
  | development | 4 | draw what you want to see on paper...dyor | UI is ALWAYS!! important | Current Standards |
  | done | 5 | have webApp be mobile friendly | used Material-ui grid, and makeStyles Hook for breakpoints | 07/30/2021 |
  | done | 6 | come up with a color scheme | had to use multipule resources on color synergy and built the colors in material-ui theme | 07/25/2021 |
  | done | 7 | build a navigation system | created my own... took me 36 hours on and off to refine and create because material-ui's breadcrumbs didnt give me what I wanted | 07/27/2021 |
  | done | 8 | establish auth hooks to provide access to users and admins | created Higher order components(havnt used yet) | N/A |
  |developement | 8 | create trie for search engine | havnt started | N/A |

- Pull the data from the API
  | Status | Item | Goal | Notes | Date Complete? |
  | ------------- |:-------------:| --------- | --------- | ---------: |
  | done | 1 | get data from Crescendo local API that was provided and store it in local data store | used persist and kept data after load | 07/23/2021 |
  | development | 2 | write all data from local API to firebase then preform a check to see if any data from local data via. uuid has changed if so add/make changes as default data but keep all other data intact {commments: [] ratings: []} | still need to write data to firebase | N/A |
  | develmpment | 3 | if changes have been made update the prop editDate A | same as above b4 I get to this functionality | N/A |

- Create a list view which includes all the recipes
  | Status | Item | Goal | Notes | Date Complete? |
  | ------------- |:-------------:| --------- | --------- | ---------: |
  | development | 1 | create a home page with 5 of the most recent updates of recipes and include basic data of that recipe as a card | just need to show 5 recent updated recipes | N/A |
  | done | 2 | create a clickable link that dynamically goes to each recipe individually | completely dynamic | 07/25/2021 |
  | done | 3 | make a recipe page with all the recipes with pagination | didnt get to pagination | 07/29/2021 |
  | development | 4 | make a search function | havnt started | N/A |

- Create a recipe detail view to display each recipe
  | Status | Item | Goal | Notes | Date Complete? |
  | ------------- |:-------------:| --------- | --------- | ---------: |
  | done | 1 | create recipe page and make it fully dynamic for any information | made details dynamic | 07/29/2021 |
  | done | 2 | have specials play a part in how items render in both ingredients and directions | made ingredients clickable | 07/29/2021 |
  | done | 3 | include the "optional" directions and show it | used part of the ingredients componets | 07/29/2021 |

- Ingredients with a matching `ingredientId` listed in the specials response should also show the special `title`, `type` and `text` under the ingredient name
  | Status | Item | Goal | Notes | Date Complete? |
  | ------------- |:-------------:| --------- | --------- | ---------: |
  | done | 1 | show specials in ingredients details that match uuid of ingredient | made details dynamic | 07/29/2021 |
  | done | 2 | use the geo details in special to create an interactive google map | was able to find address dynamically as well | 07/29/2021 |

- _Bonus:_ Create a view to add and update recipes or specials. Image upload not required. Both endpoints support GET, POST and PATCH.
  | Status | Item | Goal | Notes | Date Complete? |
  | ------------- |:-------------:| --------- | --------- | ---------: |
  | development | 1 | CRUD in both firebase and local API | started with the local API | N/A |
  | done | 2 | Update ingredients of recipes, must be logged on as and auth user | took a little reading but got it done pretty nicely | 08/01/2021 |
  | done | 3 | Update directions of recipes, must be logged on as and auth user | still working on it | 08/02/2021 |

#### Goals for the day 08/02/2021 for me to be comfortable in turning this project in by the end of the day

- The Ideas wont stop flowing I need to find a spot where I can show just enough complexity to show my talents yet be able to turn in this project without taking months :)
  | Item | Goal | Notes | Complete? |
  | ------------- |:-------------:| --------- | --------- | ---------: |
  | Navbar | Make the navigation link for recipes | just need to add the link | NO |
  | Social Link | Have all the social links go to my profiles | add a github link to this project as well | NO |
  | Clean Up | Clean Up all unused variables | In the console log get rid of all the unused variable warnings | NO |
  | Admin User | Create a basic admin user for Crescendo Collective to be able to log in as admin and edit recipes | username: test@test.me password: password | NO |

This project includes a API server (json-server) for you to use. To install and run, use the commands below:

- `npm i`
- `npm run start:api`

Once running, you can use the API endpoints listed in the following section from `http://localhost:3001`. More information about querying the server can be found on the [json-server github page](https://github.com/typicode/json-server).

#### Endpoints & Schema

##### GET `/recipes`

```JSON
[
  Recipe {
    uuid: String
    title: String
    description: String
    images: {
      full: String
      medium: String,
      small: String
    }
    servings: Number
    prepTime: Number
    cookTime: Number
    postDate: Date
    editDate: Date
    ingredients: [
      Ingredient {
        uuid: String
        amount: Number
        measurement: String
        name: String
      }
    ]
    directions: [
      Direction {
        instructions: String
        optional: Boolean
      }
    ]
  }
]
```

##### GET `/specials`

Specials on ingredients

```json
[
  Special {
    uuid: String
    ingredientId: String
    type: String
    title: String
    geo: String (optional)
    text: String (optional)
  }
]
```
