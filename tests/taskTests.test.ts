import { expect, test } from "../base/stackToDoFixture";
import EditTaskPage from "../pages/editTaskPage";
import * as data from "../test-data/stacktodo-test-data.json";

function getRandomNumber() {
    return Math.floor(Math.random() * 1000);
}

const randomNumber = getRandomNumber()
const name = data.name
const email = randomNumber+"edittask"+data.email
const password = data.password
const taskName = data.taskName+" editTask "+randomNumber

test.describe("TaskTests - EditTask",async () => {

    test("Test001 - Edit Task Test",async ({page, baseURL, signupPage, homePage, loginPage, tasksPage,addTaskPage,editTaskPage, viewTaskPage}) => {

        console.log("Random number : "+randomNumber)
        await page.goto(`${baseURL}`)
        await homePage.goToSignUp()
        expect(await page.title()).toBe(data.signUpPageTitle)

        //Create new user
        await signupPage.signUp(name,email,password)
        expect(await page.title()).toBe(data.myTaskPageTitle)
        //AddTask
        await tasksPage.goToAddTask()
        await addTaskPage.addATaskByName(taskName)
        expect(await tasksPage.getTaskCount()).toBe(1)
        //EditTask
        await tasksPage.editTaskByName(taskName)
        expect (await page.title()).toBe(data.editTaskPageTitle)
        const newTaskName = taskName+"_Edited"
        await editTaskPage.editTask(newTaskName)
        expect (await tasksPage.getTaskCount()).toBe(1)
        //View and verify edited task
        await tasksPage.viewTaskByName(newTaskName)
        expect (await viewTaskPage.viewTask(newTaskName)).toBe(newTaskName)
    })


})