import { NavLink } from 'react-router-dom';


const activeLink =  `w-full font-bold  gradient-text hover:bg-black/20 max-w-[12em] rounded-full   flex justify-center md:justify-normal p-1  items-center`
const SidebarItem = ({ Icon, text, link }) => {
  return (
    <NavLink
      to={link} className={({ isActive }) => (
              isActive ? activeLink : "w-full md:hover:bg-[#d9e4e8] max-w-[12em] hover:bg-black/20   rounded-full  flex justify-center md:justify-normal p-1 items-center"
              )}>
      <div className='p-2 md:p-3   md:hover:bg-white/20 rounded-full'>
        {Icon}
      </div> 
       <h2 className="p-2 hidden md:block lg:flex text-black text-[20px] font-medium ">{text}</h2>  
    </NavLink>
  );
};


export default SidebarItem;