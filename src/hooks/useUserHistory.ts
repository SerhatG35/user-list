import { UserHistory } from "global";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/store";

 
const useUserHistory = () => {
    const [userHistory, setUserHistory] = useState<UserHistory[] | undefined>(
        undefined
      );
      const history = useSelector((state: RootState) => state.history.history);

      useEffect(() => {
        setUserHistory(history);
      }, [history]);

      return userHistory
}

export default useUserHistory
 