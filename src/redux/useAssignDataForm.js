import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "./categoriesSlice";
import axios from "axios";

export default function useAssignDataForm() {
  const [formData, setFormData] = useState({
    email: "",
    filters: {
      subCategoryId: "",
      search: "",
      country: "",
      industry: "",
      title: "",
      minEmployeeSize: "",
      maxEmployeeSize: "",
      firstName: "",
      lastName: "",
    },
    limit: 50,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState(new Set());

  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const getSubCategoryOptions = () => {
    if (!categories) return [];
    return categories.flatMap((cat) =>
      cat.subcategories
        ? cat.subcategories.map((sub) => ({
            ...sub,
            categoryName: cat.name,
            categoryId: cat.id,
          }))
        : []
    );
  };

  const handleChange = (e, field, nested = false) => {
    const { value } = e.target;
    if (nested) {
      setFormData((prev) => ({
        ...prev,
        filters: { ...prev.filters, [field]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const toggleCategoryExpand = (categoryId) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) newSet.delete(categoryId);
      else newSet.add(categoryId);
      return newSet;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/assign-data-from-website-purchase",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      setSuccessMessage(
        `✅ Data fetched successfully! Found ${
          response.data?.assignedItems?.length || 0
        } records.`
      );
    } catch (err) {
      console.error("❌ API Error:", err);
      setError(
        err.response?.data?.message ||
          `Failed to fetch data (Status: ${
            err.response?.status || "Unknown"
          })`
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    loading,
    error,
    successMessage,
    expandedCategories,
    categories,
    getSubCategoryOptions,
    handleChange,
    toggleCategoryExpand,
    handleSubmit,
  };
}
