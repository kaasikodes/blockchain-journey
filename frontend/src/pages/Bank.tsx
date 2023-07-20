import { ASSETS } from "@/assets";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Icons } from "@/icons";
import { StarIcon, UserCheck2Icon } from "lucide-react";

const Bank = () => {
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
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Bank Administration & Policies</CardTitle>
                </CardHeader>

                <CardContent>
                  <div className="flex justify-center gap-4 text-white text-sm">
                    <div className="flex gap-2 items-center">
                      <UserCheck2Icon className="h-4 w-4" /> No. of users: 4
                    </div>
                    <div className="flex gap-2 items-center">
                      <StarIcon className="h-4 w-4" /> Total Revenue: 1000 ether
                    </div>
                  </div>
                  <div className="mt-4">
                    All customers opening a new account are required to make an
                    initial deposit of at least{" "}
                    <span className="text-white">0.05 ether</span> at the time
                    of account opening. Existing account holders must maintain
                    an amount greater than or equal to the amount they wish to
                    transfer in their accounts in order to facilitate transfers.
                    Failure to maintain the minimum balance may result in
                    account restrictions, fees, or account closure as per the
                    terms and conditions outlined in the account agreement.
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Fund Bank</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Bank;
