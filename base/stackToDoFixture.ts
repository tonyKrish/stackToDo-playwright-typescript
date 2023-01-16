import { chromium, test as baseTest } from "@playwright/test";
import SignupPage  from "../pages/signupPage";
import HomePage from "../pages/homePage";
import LoginPage  from "../pages/loginPage";
import TasksPage  from "../pages/tasksPage";
import AddTaskPage from "../pages/addTaskPage";
import ChangePasswordPage from "../pages/changePasswordPage";
import UpdateProfilePage from "../pages/updateProfilePage";
import EditTaskPage from "../pages/editTaskPage";
import ViewTaskPage from "../pages/viewTaskPage";

type pages = {
    signupPage: SignupPage
    homePage: HomePage
    loginPage: LoginPage
    tasksPage: TasksPage
    addTaskPage: AddTaskPage
    changePasswordPage: ChangePasswordPage
    updateProfilePage: UpdateProfilePage
    editTaskPage: EditTaskPage
    viewTaskPage: ViewTaskPage
}

const testPages = baseTest.extend<pages>({

    signupPage: async ({ page }, use) => {
        await use(new SignupPage(page));
    },
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    tasksPage: async ({ page }, use) => {
        await use(new TasksPage(page));
    },
    addTaskPage: async ({ page }, use) => {
        await use(new AddTaskPage(page));
    },
    changePasswordPage:async ({page}, use) => {
        await use(new ChangePasswordPage(page));
    },
    updateProfilePage:async ({page}, use) => {
        await use(new UpdateProfilePage(page));
    },
    editTaskPage:async ({page}, use) => {
        await use(new EditTaskPage(page));
    },
    viewTaskPage:async ({page}, use) => {
        await use(new ViewTaskPage(page));
    }

})

export const test = testPages;
export const expect = testPages.expect;