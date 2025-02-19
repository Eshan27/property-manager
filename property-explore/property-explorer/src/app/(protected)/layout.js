'use client';

import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const adminPaths = ['/admin']
const userPaths = ['/properties']

export default function Layout({children}) {
    // const session = await getServerSession(authOptions);

    // console.log(session)

    // if(session.user?.role !== 'admin') {
    //     redirect('/properties')
    // }
    const router  = useRouter()
    const {data, status} = useSession({
        required: true
    });
    const pathname = usePathname();

    useEffect(()=> {
        console.log({data, pathname})
        if (data?.user?.role === 'user' && !userPaths.includes(pathname)) {
            router.replace('/properties')
        }
    }, [data, pathname])

    return status ==='authenticated'? children : status ==='loading' ?'Loading...':null;
}