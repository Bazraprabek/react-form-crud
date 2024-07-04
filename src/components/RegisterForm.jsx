import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getCountries } from "../utils/api";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { FaUpload } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      country: "Nepal",
    },
  });
  const { id } = useParams();
  const navigate = useNavigate();
  const noimage = "noimage.avif";
  const [countries, setCountries] = useState([]);
  const [image, setImage] = useState(null);

  const province = [];
  for (let i = 1; i <= 7; i++) {
    province.push(
      <option value={i} key={i}>
        {i}
      </option>
    );
  }

  const fetchCountries = async () => {
    const sortedCountries = await getCountries();
    setCountries(sortedCountries);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "image/png") {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please select a .png file.");
    }
  };

  const onSubmit = (data) => {
    if (image) {
      data.image = image;
      data.id = id ? parseInt(id) : Date.now();

      const existingData = JSON.parse(localStorage.getItem("formData")) || [];
      if (id) {
        const index = existingData.findIndex(
          (item) => item.id === parseInt(id)
        );
        existingData[index] = data;
      } else {
        existingData.push(data);
      }
      localStorage.setItem("formData", JSON.stringify(existingData));
      alert("Form submitted successfully!");
      reset();
      setImage(null);
      navigate("/");
    } else {
      alert("Please provide profile picture");
    }
  };

  useEffect(() => {
    fetchCountries();
    if (id) {
      const savedData = JSON.parse(localStorage.getItem("formData"));
      if (savedData) {
        const formData = savedData.find((item) => item.id === parseInt(id));
        if (formData) {
          Object.keys(formData).forEach((key) => {
            setValue(key, formData[key]);
          });
          setImage(formData.image);
        }
      }
    }
  }, [id, setValue]);

  return (
    <Container>
      <Form className="card m-3 p-3" onSubmit={handleSubmit(onSubmit)}>
        <Row className="mb-3">
          <Col xs={12} md={6}>
            <h1>{id ? "Edit User" : "Register User"}</h1>
            <Form.Group className="mb-3" controlId="validationCustom01">
              <Form.Label>Fullname</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Your Fullname"
                {...register("fullname", { required: "Fullname is required" })}
                isInvalid={!!errors.fullname}
              />
              <Form.Control.Feedback type="invalid">
                {errors.fullname && errors.fullname.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Your Phone Number"
                {...register("phoneNumber", {
                  required: "Phone Number is required",
                  minLength: {
                    value: 7,
                    message: "Phone number must be at least 7 digits",
                  },
                })}
                isInvalid={!!errors.phoneNumber}
              />
              <Form.Control.Feedback type="invalid">
                {errors.phoneNumber && errors.phoneNumber.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                    message: "Invalid email address",
                  },
                })}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email && errors.email.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                placeholder="name@example.com"
                {...register("dob", { required: "Date of Birth is required" })}
                isInvalid={!!errors.dob}
              />
              <Form.Control.Feedback type="invalid">
                {errors.dob && errors.dob.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col xs={12} md={6} className="image-col">
            <div className="image-upload-wrapper">
              {
                <img
                  className="image-preview"
                  src={image || noimage}
                  alt="Preview"
                />
              }
              <div className="file-input-wrapper">
                <FaUpload className="upload-icon" />
                <Form.Control
                  type="file"
                  className="file-input"
                  accept=".png"
                  onChange={handleImageChange}
                />
              </div>
            </div>
          </Col>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} xs={12} md={3} controlId="formGridCity">
            <Form.Label>City</Form.Label>
            <Form.Control
              {...register("city", { required: "City is required" })}
              isInvalid={!!errors.city}
            />
            <Form.Control.Feedback type="invalid">
              {errors.city && errors.city.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} xs={12} md={3} controlId="formGridDistrict">
            <Form.Label>District</Form.Label>
            <Form.Control
              {...register("district", { required: "District is required" })}
              isInvalid={!!errors.district}
            />
            <Form.Control.Feedback type="invalid">
              {errors.district && errors.district.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group
            as={Col}
            xs={12}
            md={3}
            className="mb-3"
            controlId="exampleForm.ControlInput5"
          >
            <Form.Label>Province</Form.Label>
            <Form.Select
              aria-label="Select Province"
              {...register("province", { required: "Province is required" })}
              isInvalid={!!errors.province}
            >
              {province}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.province && errors.province.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group
            as={Col}
            xs={12}
            md={3}
            className="mb-3"
            controlId="exampleForm.ControlInput6"
          >
            <Form.Label>Country</Form.Label>
            <Form.Select
              aria-label="Select Country"
              {...register("country", { required: "Country is required" })}
              isInvalid={!!errors.country}
            >
              {countries.map((value, index) => (
                <option value={value.name.common} key={index}>
                  {value.name.common}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.country && errors.country.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Button type="submit" size="lg">
          {id ? "Update" : "Submit"}
        </Button>
      </Form>
    </Container>
  );
};

export default RegisterForm;
