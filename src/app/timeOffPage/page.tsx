"use client"
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Table,
  TableHeader,
  TableBody,
  // TableFooter,
  // TableHead,
  TableRow,
  TableCell,
  // TableCaption,
} from '@/components/ui/table';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { gql, useQuery } from '@apollo/client';
import { useCookies } from 'next-client-cookies';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const USER_QUERY  = gql`
  query {
  myProfile {
    id
    name
    avatar
  }
}
`

interface LoginType {
  login: {
    access_token: string;
    refresh_token: string;
    readonly __typename: string;
  };
}

function TimeOffPage() {
  const arrayTabs = ['Personal', 'Job', 'Time Off', 'Emergency', 'Documents']
  const cookies = useCookies();
  const jwtToken: string | undefined = cookies.get('jwtToken');
  const router = useRouter();
  


  const { data, loading } = useQuery<LoginType>(USER_QUERY, {
   context: {
     headers: {
       Authorization: `Bearer ${jwtToken}  `,
     },
   },
 });

console.log(!!data)



 useEffect(() => {
  if(!data && !loading) {
    router.push('/');
  }

 },[data, router, loading])
 if(loading) return <div>Loading</div>

  return (
    <div className="flex flex-col lg:flex-row p-4 space-y-4 lg:space-y-0 lg:space-x-4">

      <aside className="lg:w-1/4 p-4 border-r">
        <Card className="p-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="mt-4">
            <h3 className="font-bold">Alexandra Kuibyshevskaya</h3>
            <p className="text-sm">Operations - Full-Time</p>
            <p className="text-sm">Europe, London, UK</p>
            <p className="text-sm">Joined: Sep 3, 2020</p>
          </div>
        </Card>

        <div className="mt-8">
          <h4 className="font-bold mb-2">Direct Reports</h4>
          <ul>
            <li>Shane</li>
            <li>Nathan</li>
            <li>Mitchell</li>
            <li>Philip</li>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:w-3/4 p-4">
        {/* Tabs */}
        <Tabs defaultValue="Time Off">
          <TabsList>
            {arrayTabs.map(item => (
              <TabsTrigger key={item} value={item}>
                {item}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Time Off Tab Content */}
          <TabsContent value="Time Off">
            {/* Time Off Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              <Card className="p-4">
                <h4>Sick</h4>
                <p>3 Days Available</p>
              </Card>
              <Card className="p-4">
                <h4>Annual Leave</h4>
                <p>10.3 Days Available</p>
              </Card>
              <Card className="p-4">
                <h4>Comp/Time Off</h4>
                <p>0 Days Used</p>
              </Card>
            </div>

            {/* Upcoming Time Off */}
            <div className="mt-8">
              <h4>Upcoming Time Off</h4>
              <p>Jan 27: 1 day of sick leave</p>
              <p>Jul 4: Independence Day</p>
            </div>

            {/* History Table */}
            <Table className="mt-8">
              <TableHeader>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Used Days</TableCell>
                  <TableCell>Earned Days</TableCell>
                  <TableCell>Balance</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>23/05/2024</TableCell>
                  <TableCell>Accrual</TableCell>
                  <TableCell>3</TableCell>
                  <TableCell>3</TableCell>
                  <TableCell>3.0</TableCell>
                </TableRow>
                {/* More rows as per data */}
              </TableBody>
            </Table>
          </TabsContent>

          {/* Other Tabs Content (Placeholders) */}
          {arrayTabs.filter(tab => tab !== "Time Off").map(tab => (
            <TabsContent key={tab} value={tab}>
              <p>{tab} content goes here...</p>
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  );
}

export default TimeOffPage;