import { expect, test } from "../base/stackToDoFixture";
import * as data from "../test-data/stacktodo-test-data.json";

function getRandomNumber() {
    return Math.floor(Math.random() * 1000);
}

const randomNumber = getRandomNumber()
const name = data.name
const email = randomNumber+"deletetest"+data.email
const password = data.password

test.describe("Verify : Deleting two or more tasks belonging to an user",async () => {

    test("Verify Deleting two or more",async ({page, baseURL, signupPage, homePage, tasksPage, addTaskPage}) => {
        console.log("Random number : "+randomNumber)
        await page.goto(`${baseURL}`)
        await homePage.goToSignUp()
        expect(await page.title()).toBe(data.signUpPageTitle)

        //Create new user
        await signupPage.signUp(name,email,password)
        expect(await page.title()).toBe(data.myTaskPageTitle)

        //add 5 tasks
        while(await tasksPage.getTaskCount() < 5){
            await tasksPage.goToAddTask()
            await addTaskPage.addATask(randomNumber)
        }
        expect(await tasksPage.getTaskCount()).toBe(5)

        //delete 3 tasks

        //for(let i=0; i<4; i++){
        for(let i=0; i<3; i++){
            await tasksPage.deleteLastTask(await tasksPage.getTaskCount())
        }

        console.log("Final task count after deleting 3 tasks of user : "+await tasksPage.getTaskCount())
        
        expect(await tasksPage.getTaskCount()).toBe(1)
        //Verify: Deleting two or more tasks belonging to an user results in only one task being left displayed on the task table.
        //Result after test => After deleting two or more tasks (3 tasks) the non-deleted tasks remain in the task table. Not just one task, hence the failure
        //To delete all tasks but one, comment line 35 and uncomment line 34
    })
})