import { LoginPage } from "./login-page";
import { Navigation } from "components/navigation"; // Corrected import path

/**
 * Login Page
 *
 * This is the server component that renders the login page.
 * It includes the Navigation component and the client-side LoginPage component.
 */
export const metadata = {
  title: "Login - Sierra Explore",
  description: "Log in to your Sierra Explore account",
}

export default function Login() {
  return (
    <main>
      <Navigation />
      <div className="pt-16">
        <LoginPage />
      </div>
    </main>
  )
}