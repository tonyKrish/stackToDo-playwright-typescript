import { expect, test } from "../base/stackToDoFixture";
import * as data from "../test-data/stacktodo-test-data.json";

test.describe("UserTests - SignupTest, ChangePassword, Update profile Tests, invalid login",async () => {

    function getRandomNumber() {
        return Math.floor(Math.random() * 1000);
    }
    
    const randomNumber = getRandomNumber()
    const name = data.name
    const email = randomNumber+"usertest"+data.email
    const password = data.password
    const newPassword = data.editedPassword
    const newName = data.editedName

    test("Test001 - Signup Test",async ({page, baseURL, signupPage, homePage, loginPage, tasksPage}) => {
        console.log("Random number : "+randomNumber)
        await page.goto(`${baseURL}`)
        await homePage.goToSignUp()
        expect(await page.title()).toBe(data.signUpPageTitle)
        //create user
        await signupPage.signUp(name,email,password)
        expect(await page.title()).toBe(data.myTaskPageTitle)
        expect (await tasksPage.getProfileName()).toBe(name)
        //Logout and Login as user
        await tasksPage.logout(name)
        expect (await homePage.logoutAlert()).toContainText("Logged out")
        
        await homePage.goToLogin()
        expect(await page.title()).toContain(data.loginPageTitle)
        await loginPage.login(email,password)
        expect (await tasksPage.getProfileName()).toBe(name)
    })

    test("Test002 - Change Password Test",async ({page, baseURL, homePage, loginPage, tasksPage, changePasswordPage}) => {

        //Login as user
        await page.goto(`${baseURL}`)
        await homePage.goToLogin()
        expect(await page.title()).toContain(data.loginPageTitle)
        await loginPage.login(email,password)
        expect (await tasksPage.getProfileName()).toBe(name)
        //change password
        await tasksPage.goToChangePassword(name)
        expect(await page.title()).toContain(data.updatePasswordPageTitle)
        await changePasswordPage.changePassword(password, newPassword)
        expect (await changePasswordPage.passwordUpdateAlert()).toContainText("Password updated")
        await changePasswordPage.logout(name)
        expect (await homePage.logoutAlert()).toContainText("Logged out")
        //Login with new password
        await homePage.goToLogin()
        expect(await page.title()).toContain(data.loginPageTitle)
        await loginPage.login(email,newPassword)
        expect (await tasksPage.getProfileName()).toBe(name)
    })

    test("Test003 - Update Profile Test",async ({page, baseURL, homePage, loginPage, tasksPage, updateProfilePage}) => {

        //Login as user
        await page.goto(`${baseURL}`)
        await homePage.goToLogin()
        expect(await page.title()).toContain(data.loginPageTitle)
        await loginPage.login(email,newPassword)
        expect (await tasksPage.getProfileName()).toBe(name)
        //change password
        await tasksPage.goToUpdateProfile(name)
        expect(await page.title()).toContain(data.updateProfilePageTitle)
        //Update name in profile
        await updateProfilePage.updateName(newName)
        expect (await updateProfilePage.profileUpdateAlert()).toContainText("Profile Successfully Changed!")
        //verify profilename change
        expect (await tasksPage.getProfileName()).toBe(newName)
    })

    test("Test004 - Failed Login Test",async ({page, baseURL, loginPage,homePage}) => {

        //Login with no email
        await page.goto(`${baseURL}`)
        await homePage.goToLogin()
        expect(await page.title()).toContain(data.loginPageTitle)
        await loginPage.login("",password)
        expect (await loginPage.getError()).toContain(data.loginEmailErrorText)
        //Login with no password
        await page.reload()
        await loginPage.login(email," ")
        expect (await loginPage.getError()).toContain(data.loginPasswordErrorText)
        //Login with wrong email and wrong password
        await page.reload()
        await loginPage.login("wrongemail@testmail.com","wrongPassword")
        expect (await loginPage.invalidLoginAlert()).toContainText(data.invalidLoginAlertText)
    })
})