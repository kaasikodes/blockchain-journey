import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import { CreateProfileForm } from "./CreateProfile";

import { ASSETS } from "@/assets";

import Layout from "@/components/layout/Layout";

export function CreateAccount() {
  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div>
            <img src={ASSETS.blocksPng} alt="blockchain" />
          </div>
        </div>
        <div className="w-full flex justify-end">
          <div className="w-3/4 mt-6 mr-4">
            <AccountForm />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const AccountForm = () => {
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Create an account</CardTitle>
        <CardDescription>
          Enter your email below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent className="">
        <CreateProfileForm />
      </CardContent>
    </Card>
  );
};
