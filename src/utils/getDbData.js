const useToGetDbData = () => {
  const [snapshot, loading, error] = useObject(ref(db, baseRef + path));
  if (!error && !loading && snapshot.exists) {
    return snapshot;
  } else {
    return "Err";
  }
};

export default useToGetDbData;
