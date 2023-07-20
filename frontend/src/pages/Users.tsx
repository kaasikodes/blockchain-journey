import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { CopyIcon } from "lucide-react";
import { useState } from "react";

const DUMMY_USERS = Array(12).fill({
  id: "re",
  email: "alexjones@example.com",
  address: "0xc454opp4 ...",
  name: "Alex Jones",
});
const Users = () => {
  return (
    <Layout>
      <div className="flex flex-col gap-20 mt-4">
        <h2 className="text-3xl font-bold capitalize text-start underline underline-offset-8">
          Account Owners
        </h2>
        <UserCardList data={DUMMY_USERS} />
      </div>
    </Layout>
  );
};

interface ICardProps {
  id: string;
  name: string;
  email: string;
  address: string;
  profileAction?: "edit" | "view";
  transferFunds?: boolean;
}

const UserCardList: React.FC<{ data: ICardProps[] }> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-x-6 gap-y-4">
      {data.map((item, i) => (
        <UserCard {...{ ...item }} key={i} />
      ))}
    </div>
  );
};
export const UserCard: React.FC<ICardProps> = ({
  name,
  email,
  address,
  profileAction = "view",
  transferFunds = false,
}) => {
  const { toast } = useToast();
  return (
    <Card>
      <div className="w-full bg-slate-800 rounded-lg shadow-lg p-4 flex flex-col justify-center items-center">
        <div className="mb-4">
          <img
            className="object-center object-cover rounded-full h-24 w-24"
            src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80"
            alt="photo"
          />
        </div>
        <div className="text-center">
          <p className="text-lg text-white font-semibold">{name}</p>
          <p className="text-sm text-foreground text-gray-400 font-normal">
            {email}
          </p>
          <div className="flex gap-2 items-end">
            <p className="text-sm text-gray-400 font-normal mt-3">{address}</p>

            <CopyIcon
              className="h-4 w-4 cursor-pointer"
              onClick={() => {
                toast({
                  description: "Address has been copied.",
                });
              }}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full items-stretch mt-4">
          <Button
            onClick={() => {
              toast({
                description: "Your message has been sent.",
              });
            }}
          >
            Fund Account
          </Button>
          {profileAction === "view" && <Button>View Profile</Button>}
          {profileAction === "edit" && <DialogDemo />}
          {transferFunds && <Button>Transfer Funds</Button>}
        </div>
      </div>
    </Card>
  );
};

export function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default Users;
