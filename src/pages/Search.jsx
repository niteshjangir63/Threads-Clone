import { useEffect, useState } from "react";
import Input from "../components/inputBox/Input";
import { search } from "../api/userApi";
import Card from "../components/Cards/Card";
import Loader from "../components/loader/Loader";
import toast from "react-hot-toast";

export default function Search() {

  const [value, setValue] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    if (!value.trim()) {
      setResult([]);
      return;
    }

    const delay = setTimeout(async () => {

      setLoading(true);

      try {
        const res = await search(value);
        setResult(res.data);
      } catch (e) {
        toast.error(e.response.data.message);
      } finally {
        setLoading(false);
      }

    }, 500);

    return () => clearTimeout(delay);

  }, [value]);

 
  return (
    <>
      <Input value={value} onChange={(e) => setValue(e.target.value)} />

      {loading && <Loader />}

      {!loading &&
        result.map((user) => (
          <Card key={user._id} user={user} />
        ))}

      {!loading && value && result.length === 0 && (
        <p className="text-secondary mt-2">No users found</p>
      )}
    </>
  );
}