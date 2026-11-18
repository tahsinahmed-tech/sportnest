export const navItems = [
  { label: "Home", href: "/", requiresAuth: false },
  { label: "All Facilities", href: "/facilities", requiresAuth: false },
  { label: "My Bookings", href: "/dashboard/my-bookings", requiresAuth: true },
  { label: "Add Facility", href: "/dashboard/add-facility", requiresAuth: true },
  { label: "Manage Facilities", href: "/dashboard/manage-facilities", requiresAuth: true },
];