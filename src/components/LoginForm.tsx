import { ErrorValidationTypes } from "@/app/interface";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import ShowErrorField from "./ShowErrorField";


interface LoginFormProps {
  logIn:() => void;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  errorValidation:ErrorValidationTypes
}

export function LoginForm({logIn, setEmail, setPassword, errorValidation}:LoginFormProps) {
  console.log(errorValidation)
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" onChange={e =>setEmail(e.target.value)} />
          <ShowErrorField error={errorValidation.email}/>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" onChange={e =>setPassword(e.target.value)} />
          <ShowErrorField error={errorValidation.password}/>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={logIn} className="w-full">Sign in</Button>
      </CardFooter>
    </Card>
  )
}