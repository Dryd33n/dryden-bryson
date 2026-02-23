'use client'

import PageHeader from '../components/global/PageHeader';
import Navbar from '../components/global/Navbar';
import { home, aboutItems, contactItems } from '@/lib/menuItems';

export default function Portfolio(){

return (<>

{/* HEADER */}
<div className="relative">
  <div className="absolute top-6 left-6 z-10">
    <Navbar menuItemArrays={[home, aboutItems, contactItems]} layout="horizontal" />
  </div>
  <PageHeader title="PORTFOLIO" />
</div>


</>)


}