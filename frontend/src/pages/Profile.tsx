import Layout from "@/components/layout/Layout";
import { UserCard } from "./Users";
import { ASSETS } from "@/assets";

const Profile = () => {
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
              <UserCard
                {...{
                  id: "re",
                  email: "alexjones@example.com",
                  address: "0xc454opp4 ...",
                  name: "Alex Jones",
                  profileAction: "edit",
                  transferFunds: true,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
