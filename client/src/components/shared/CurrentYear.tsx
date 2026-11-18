// "use client";

// const CurrentYear = () => {
//   return <>{new Date().getFullYear()}</>;
// };

// export default CurrentYear;

"use client";

import { useEffect, useState } from "react";

const CurrentYear = () => {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return <>{year ?? "2026"}</>;
};

export default CurrentYear;