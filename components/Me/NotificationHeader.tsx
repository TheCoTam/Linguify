import { Ellipsis } from 'lucide-react';

import { CardHeader } from '@/components/ui/card';
import Menu from '@/components/Me/Menu';

function Header() {
  return (
    <CardHeader className="flex flex-row justify-between">
      <p className="text-2xl font-semibold">Notifications</p>
      <Menu>
        <Ellipsis className="cursor-pointer hover:bg-slate-100 rounded-full active:bg-slate-200" />
      </Menu>
    </CardHeader>
  );
}

export default Header;
