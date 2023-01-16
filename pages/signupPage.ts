import { Page } from "@playwright/test";


export default class SignupPage {

    constructor(public page:Page) {}

    async signUp(name: string, email: string, password: string) {
        await this.enterName(name)
        await this.enterEmail(email)
        await this.enterPassword(password)
        await this.checkAgreeTerms()
        await this.clickOnSignUpBtn()
    }

    async enterName(name: string) {
        await this.page.locator("#name")
            .fill(name)
    }

    async enterEmail(emailaddress: string) {
        await this.page.locator("#email")
            .fill(emailaddress)
    }

    async enterPassword(password: string) {
        await this.page.locator("#password")
            .fill(password)
    }

    async checkAgreeTerms() {
        await this.page.locator("#agree").check()
    }

    async clickOnSignUpBtn() {
        await Promise.all([
            this.page.waitForNavigation(),
            this.page.locator("#submit").click()
        ])
    }
}