/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../../Context/Context";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { SiSocketdotio } from "react-icons/si";
import { FaRegDotCircle } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { AuthContext } from "../../../Context/AuthProvider";
import { Link, useLocation } from "react-router-dom";
import { Form, Button, ConfigProvider, Input, Select, Space, Radio,Checkbox} from "antd";


const Expertise = ({ consultant }) => {
  const { language } = useContext(MyContext);
const { user } = useContext(AuthContext);
const [isVisible, setIsVisible] = useState(true);
const { TextArea } = Input;
const header = {
  headers: {
    Authorization:'Bearer EAAUYr1lX2YwBOwoZBgjWLjfQCQWnG5BzizCQ4BkKAgneItEkhKG1sRZAfMNxQZCvUnZALdJyNpZAjQjkoXZBiLPsW5SXUmUnXoX3dZCFXc52DRp6Qu1qWXXaeqZCz3EsmD76PdWlLrxGmv5yt8X8c30yJn6dSpTZAacsSQyJm86Iw4SjsVMNce7sSB32XO6xG5jXZB',
    Accept: 'application/json',
  }
}
const {
displayName: cName,
email: cMail,
photoURL,
phone: cPhone,
designation,
description,
about,
recentWorks,
successes,
experience,
qualification,
availability,
workingWith,
prefertime,
selectedDays,
} = consultant;
const [hideButton, setHideButton] = useState(false);
// const { handleSubmit, register, reset } = useForm({
// );

const [form] = Form.useForm();

const [showhide,setshowhide] = useState('');
const handlebudget = (event) => {
  const getoption = event;
  setshowhide(getoption);
}
const location = useLocation();
const checkbox = (e) =>{
  const get = e.target.value;
}

const onSubmit = async (data) => {
const {
name,
email=user?.email,
phone,
appointDate,
appointTime,
problemType,
budget,
fileLink,
caseSummary,
urgent,
} = data;

try {
// Prepare Appointment Data
const appointmentData = {
name,
email,
phone,
appointDate,
appointTime,
problemType,
budget,
fileLink,
caseSummary,
urgent,
cName,
cMail,
cPhone,
cId: consultant._id,
request: "pending",
confirmation: "pending",
};


// reset();
// Send Course Data to API
const apiResponse = await fetch(
"https://ai-server-sooty.vercel.app/appoint",
{
method: "POST",
headers: {
"content-type": "application/json",
},
body: JSON.stringify(appointmentData),
}
);

if (!apiResponse.ok) {
throw new Error("Request failed");
}

const responseData = await apiResponse.json();

if (responseData.insertedId) {
  
  form.resetFields();

toast.success("You've Successfully requested for the appointment");
document.getElementById("my_modal_5").close();

const body = { 
  "messaging_product": "whatsapp",
  "to": "8801995536898",
  "type": "template",
  "template": { 
    "name": "consultancy_alert", 
    "language": { 
      "code": "en_US"
    },
    "components" : [
      {
        "type" : "body",
        "parameters" : [{
          "type":"text",
          "text" : name,
        },
        {
          "type":"text",
          "text" : cName,
        },
        {
          "type":"text",
          "text" : problemType,
        },
        {
          "type":"text",
          "text" : appointTime,
        },
        {
          "type":"text",
          "text" : phone,
        }] 
      }
    ]
  } 
}
axios.post('https://graph.facebook.com/v18.0/260864707100931/messages',body,header)
.then((res)=>{
  console.log("sent");
})
.catch(()=>{
  console.log("error");
})

}
} catch (error) {
console.error("Error:");
toast.error("Something went wrong, try again");
}
};

// hide on footer
useEffect(() => {
const handleScroll = () => {
const scrollPosition = window.scrollY;
const viewportHeight = window.innerHeight;
const documentHeight = document.documentElement.scrollHeight;
const last400Pixels = documentHeight - viewportHeight - 1560;

if (scrollPosition > last400Pixels) {
setIsVisible(false);
} else {
setIsVisible(true);
}
};

window.addEventListener("scroll", handleScroll);

return () => {
window.removeEventListener("scroll", handleScroll);
};
}, []);
return (
<div >
  <h3 className="text-2xl font-semibold"> {language === "bn" ? "উপস্থিতি" : "Availability"}</h3>
  <div className="mt-2 ml-2 space-y-2 text-lg section">
    {selectedDays?.map((d) => (
    <p className="flex items-center gap-2" key={d}>
      <FaRegDotCircle /> {d}
    </p>
    ))}
  </div>
  <h3 className="mt-4 text-2xl font-semibold"> {language === "bn" ? "কাজ করছেন" : "Working With"}</h3>
  <div className="mt-2 ml-2 space-y-2 text-lg section ">
    {workingWith?.map((d) => (
    <p className="flex items-center gap-2" key={d}>
      {" "}
      <SiSocketdotio /> {d}
    </p>
    ))}
  </div>

  <div className="flex justify-center md:mt-12 ">
    {user ? (
    <button onClick={()=> setHideButton(true)}
      className=" py-2 px-5 bg-[#ED1B24] rounded-[5px] text-white font-semibold hidden md:block"
      >
      {language == "bn"
      ? "এপয়েন্টমেন্ট বুক করুন"
      : "Book Your Appointment"}
    </button>
    ) : (
    <Link to="/login" state={{ from: location }} onClick={()=> toast.error("Please Login first")}
    className=" py-2 px-5 bg-[#ED1B24] rounded-[5px] text-white font-semibold hidden md:block"
    >
    {language == "bn"
    ? "এপয়েন্টমেন্ট বুক করুন"
    : "Book Your Appointment"}
    </Link>
    )}
  </div>

  {/* Fixed button for mobile */}
  {isVisible && (
  <div className="fixed bottom-0 z-10 w-11/12 p-2 mx-auto bg-white rounded-lg md:hidden">
    {user ? (
    <button onClick={()=> document.getElementById("my_modal_5").showModal()}
      className="w-full btn-view-red"
      >
      {language == "bn"
      ? "এপয়েন্টমেন্ট বুক করুন"
      : "Book Your Appointment"}{" "}
      <IoIosArrowForward />
    </button>
    ) : (
    <Link to="/login" state={{ from: location }} onClick={()=> toast.error("Please Login first")}
    className="w-full btn-view-red"
    >
    {language == "bn"
    ? "এপয়েন্টমেন্ট বুক করুন"
    : "Book Your Appointment"}{" "}
    <IoIosArrowForward />
    </Link>
    )}
  </div>
  )}

  <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
    <div className="modal-box">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button
          className="absolute text-white btn btn-sm btn-circle btn-ghost right-2 top-2 bg-primary hover:bg-primary">
          ✕
        </button>
      </form>

      <ConfigProvider
        theme={{
          token: {
            // Seed Token
            colorPrimary: 'gray',
            borderRadius: 2,
            colorBorder:'gray',
            controlOutlineWidth:0,
            

            // Alias Token
            colorBgContainer: 'white',
          },
        }}
      >
    <Form
          autoComplete="on"
          onFinish={onSubmit}
          onFinishFailed={() => {
          console.log("error");
          }}
          form={form}
          
        >
          <label htmlFor="name" className="mb-4 text-lg font-semibold">
            Name
          </label>
          <Form.Item
            name="name"
            style={{marginTop:"0.5rem",}}
            rules={[
              {
                required: true,
                message: "Please enter your name",
              },
              { whitespace: true },
            ]}
            hasFeedback
          >
            <Input type="text" placeholder="Enter your name" className="p-2 rounded-md"/>
          </Form.Item>
          

          <label htmlFor="email" className="mb-2 text-lg font-semibold" >
            Email 
          </label>
          <p className="text-slate-500">(This email is taken from your login information)</p>
          <Form.Item
            name="email"
            style={{marginTop:"0.5rem"}}
            
            
            // rules={[
            //   {
            //     required: true,
            //     message: "Please enter your email",
            //   },
            //   { type: "email", message: "Please enter a valid email"},
            // ]}
            // hasFeedback
          >
            <Input type="email" placeholder={user?.email} className="p-2 rounded-md placeholder:text-slate-900" 
            disabled/>
          </Form.Item>

          <label htmlFor="phone" className="mb-2 text-lg font-semibold" >
            Phone
          </label>
          <Form.Item
            name="phone"
            style={{marginTop:"0.5rem"}}
            rules={[
              // {
              //   required: true,
              //   message: "Please enter your phone number",
              // },
              // { min:11,message:"number must be 11 character long"},
              // { max:11, message: "Please enter a valid number (e.g. 01XXXXXXXXX)"},
              {
                validator(_,value) {
                  if (/^01\d{9}$/.test(value)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Please enter a valid number (e.g. 01XXXXXXXXX)'));
                },
              },
            ]}
            hasFeedback
          >
            <Input type='tel'placeholder="Enter phone Number" className="p-2 rounded-md" />
          </Form.Item>


          <label htmlFor="appointDate" className="mb-2 text-lg font-semibold" >
            Appointment Date 
          </label>
          <Form.Item
            name="appointDate"
            style={{marginTop:"0.5rem"}}
            rules={[
              {
                required: true,
                message: "please select appointment date",
              },
            ]}
            hasFeedback
          >
            <Input type="date" className="p-2 rounded-md"/>
          </Form.Item>

          <label htmlFor="appointTime" className="p-2 mb-2 text-lg font-semibold" >
            Time Schedule
          </label>
          <Form.Item 
          name="appointTime"
          style={{marginTop:"0.5rem",zIndex:'2000'}}
          rules={[
              {
                required: true,
                message: "please select your time",
              },
            ]}
            hasFeedback>
            <Select placeholder="Select your preferable time" style={{marginBottom:"1rem"}} getPopupContainer={node => node.parentNode}>
            {prefertime?.map((e)=>(<Select.Option value={e} key={e}>{e}</Select.Option>))}
            </Select>
          </Form.Item>

          <label htmlFor="problemType" className="mb-2 text-lg font-semibold" >
            Consultancy Type
          </label>
          <Form.Item 
          name="problemType"
          style={{marginTop:"0.5rem"}}
          rules={[
              {
                required: true,
                message: "please select a consultancy",
              },
            ]}
            hasFeedback>
            <Select placeholder="Select your Consultancy type" value={showhide} style={{marginBottom:"1rem"}} onChange={handlebudget} getPopupContainer={node => node.parentNode}>
            {workingWith?.map((e)=>(<Select.Option value={e} key={e}>{e}</Select.Option>))}
            </Select>
          </Form.Item>

          {showhide === 'Career Consultancy' && 
          // (<Input defaultValue="free" name="budget" hidden/>
          (
            <div>
              <label htmlFor="budget" className="text-lg font-semibold ">
               Your Budget
              </label>
              <Form.Item name="budget"
              rules={[
                {
                  required: true,
                  message: "please select a budget",
                },
              ]}>
                <Radio.Group>
                  <Space direction="vertical">
                    {cName === "Md. Shabbir Hossain Bhuiyea (Rossi)"? "" : <Radio value="Free"> Free </Radio> }
                    
                    <Radio value="500 BDT - 1000 BDT"> 500 BDT - 1000 BDT</Radio>
                    <Radio value="1000 BDT - 3000 BDT"> 1000 BDT - 3000 BDT</Radio>
                  </Space>
                </Radio.Group>
              </Form.Item>
            </div>
          )
          }
          
          {showhide === 'Corporate Consultancy' &&
            (
            <div>
              <label htmlFor="problemType" className="text-lg font-semibold ">
               Your Budget
              </label>
              <Form.Item name="budget"
              rules={[
                {
                  required: true,
                  message: "please select a budget",
                },
              ]}>
                <Radio.Group>
                  <Space direction="vertical">
                    <Radio value="60000 BDT - 80000 BDT "> 60000 BDT - 80000 BDT </Radio>
                    <Radio value="80000 BDT - 100000 BDT"> 80000 BDT - 100000 BDT</Radio>
                    <Radio value="More than 100000 BDT"> More than 100000 BDT</Radio>
                  </Space>
                </Radio.Group>
              </Form.Item>
            </div>
            )
          }

          {showhide === '1:1 Mentorship Program' &&
            (
            <div>
              <label htmlFor="budget" className="text-lg font-semibold ">
               Your Budget
              </label>
              <Form.Item name="budget"
              rules={[
                {
                  required: true,
                  message: "please select a budget",
                },
              ]}>
                <Radio.Group>
                  <Space direction="vertical" >
                    <Radio value="Negotiable" defaultChecked={true}>Negotiable</Radio>
                    
                  </Space>
                </Radio.Group>
              </Form.Item>
            </div>
            )
          }
          
          {showhide === 'Research (Thesis/Report/Patent)' &&
            (
            <div>
            <label htmlFor="budget" className="text-lg font-semibold ">
               Your Budget
              </label>
              <Form.Item name="budget"
              rules={[
                {
                  required: true,
                  message: "please select a budget",
                },
              ]}>
                <Radio.Group>
                  <Space direction="vertical">
                    <Radio value="10000 BDT - 20000 BDT"> 10000 BDT - 20000 BDT </Radio>
                    <Radio value="20000 BDT - 30000 BDT"> 20000 BDT - 30000 BDT</Radio>
                    <Radio value="More than 30000 BDT"> More than 30000 BDT</Radio>
                  </Space>
                </Radio.Group>
              </Form.Item>
            </div>
            )
          }
          
          {showhide === 'AI Project (Basic to Advanced)' &&
            (
            <div>
            <label htmlFor="budget" className="text-lg font-semibold ">
               Your Budget
              </label>
              <Form.Item name="budget"
              rules={[
                {
                  required: true,
                  message: "please select a budget",
                },
              ]}>
                <Radio.Group>
                  <Space direction="vertical">
                    <Radio value="12000 BDT - 20000 BDT">12000 BDT - 20000 BDT</Radio>
                    <Radio value="20000 BDT - 30000 BDT">20000 BDT - 30000 BDT</Radio>
                  </Space>
                </Radio.Group>
              </Form.Item>
            </div>
            )
          } 
          

          <label htmlFor="fileLink" className="mb-2 text-lg font-semibold" >
            Attach your file (If any)
          </label>
          <p className="text-red-700">(Please Attach your file drive link)</p>
          <Form.Item
            name="fileLink"
            style={{marginTop:"0.5rem"}}
            rules={[{ type: "url", message: "Please enter a valid url" }]}
            
          >
            <Input placeholder="Add your file drive url (ex. www.example.com)" className="p-2 rounded-md"/>
          </Form.Item>

          <label htmlFor="caseSummary" className="text-lg font-semibold " >
            Explain your problem (in details): 
          </label>
          <Form.Item
           name="caseSummary"
           style={{marginTop:"0.5rem"}}
           rules={[
            { required: true, 
              message: "Please write your problem in details" 
            }
            ]}
            hasFeedback 
           >
            <TextArea rows={4} className="rounded-md"/>
          </Form.Item>
          
          <ConfigProvider
              theme={{
                token: {
                  // Seed Token
                  colorPrimary: 'red',
                  borderRadius: 2,
                  colorBorder:'red',
                  controlOutlineWidth:0,
                  // Alias Token
                  colorBgContainer: 'white',
                },
              }}
            >
            
          <Form.Item
            name="urgent"
            wrapperCol={{ span: 24 }}
            style={{marginTop:"2rem"}} 
          >
            <Checkbox.Group className="">
              <Space direction="vertical">
                <Checkbox value="yes" className="text-xl text-red-500">I need urgent consultancy</Checkbox>
              </Space>
            </Checkbox.Group>
              
              {/* <label htmlFor="urgent" ></label> */}
            
           {/* <Input type="checkbox" value="1"  /> */}
            
            </Form.Item>
          </ConfigProvider>
          
          <button type="submit" className="w-full mt-2 text-white bg-black btn-view">
            Submit
          </button>
          
          {/* <Form.Item >
            <Button block  htmlType="submit" style={{background:"black" , padding:"1.5rem", color:"white"}}>
              Register
            </Button>
          </Form.Item> */}
    </Form>

      </ConfigProvider>
      {/* <div className="modal-action">
      </div> */}
    </div>
  </dialog>
  
  {/* For large device */}
  {hideButton && (
  <div className="transition ease-in delay-0 mt-5 bg-[#FFFFFF]/30 border border-black rounded-lg p-4 hover:shadow-2xl hover:delay-75">
    
    <ConfigProvider
    theme={{
      token: {
        // Seed Token
        colorPrimary: 'gray',
        borderRadius: 2,
        colorBorder:'gray',
        controlOutlineWidth:0,
        
        

        // Alias Token
        colorBgContainer: 'white',
      },
    }}
    >
    <Form
          autoComplete="on"
          onFinish={onSubmit}
          form={form}
          onFinishFailed={() => {
            console.log( "error" );
          }}
        >
          <label htmlFor="name" className="mb-4 text-lg font-semibold">
            Name
          </label>
          <Form.Item
            name="name"
            style={{marginTop:"0.5rem"}}
            rules={[
              {
                required: true,
                message: "Please enter your name",
              },
              { whitespace: true },
            ]}
            hasFeedback
          >
            <Input type="text" placeholder="Enter your name" className="p-2 rounded-md"/>
          </Form.Item>

          <label htmlFor="email" className="mb-2 text-lg font-semibold" >
            Email 
          </label>
          <p className="text-slate-500">(This email is taken from your login information)</p>

          <Form.Item
            name="email"
            style={{marginTop:"0.5rem"}}
            
            // initialValue={user?.email}
             
            // rules={[
            //   {
            //     required: true,
            //     message: "Please enter your email",
            //   },
            //   { type: "email", message: "Please enter a valid email"},
            // ]}
            // hasFeedback
          >
            <Input type="email" placeholder={user?.email} className="p-2 rounded-md placeholder:text-slate-900" disabled />
          </Form.Item>

          <label htmlFor="phone" className="mb-2 text-lg font-semibold" >
            Phone
          </label>
          <Form.Item
            name="phone"
            style={{marginTop:"0.5rem"}}
            rules={[
              // {
              //   required: true,
              //   message: "Please enter your phone number",
              // },
              // { min:11,message:"number must be 11 character long"},
              // { max:11, message: "Please enter a valid number (e.g. 01XXXXXXXXX)"},
              {
                validator(_,value) {
                  if (/^01\d{9}$/.test(value)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Please enter a valid number (e.g. 01XXXXXXXXX)'));
                },
              },
            ]}
            hasFeedback
          >
            <Input placeholder="Enter phone Number" className="p-2 rounded-md" />
          </Form.Item>


          <label htmlFor="appointDate" className="mb-2 text-lg font-semibold" >
            Appointment Date 
          </label>
          <Form.Item
            name="appointDate"
            style={{marginTop:"0.5rem"}}
            rules={[
              {
                required: true,
                message: "please enter appointment date",
              },
            ]}
            hasFeedback
          >
            <Input type="date" className="p-2 rounded-md" />
          </Form.Item>

          <label htmlFor="appointTime" className="mb-2 text-lg font-semibold" >
            Time Schedule
          </label>
          <Form.Item 
          name="appointTime"
          style={{marginTop:"0.5rem"}}
          rules={[
              {
                required: true,
                message: "please select your time",
              },
            ]}
            hasFeedback>
            <Select placeholder="Select your preferable time" style={{marginBottom:"1rem"}}>
            {prefertime?.map((e)=>(<Select.Option value={e} key={e}>{e}</Select.Option>))}
            </Select>
          </Form.Item>

          <label htmlFor="problemType" className="mb-2 text-lg font-semibold" >
            Consultancy Type
          </label>
          <Form.Item 
          name="problemType"
          style={{marginTop:"0.5rem"}}
          rules={[
              {
                required: true,
                message: "please select a consultancy",
              },
            ]}
            hasFeedback>
            <Select placeholder="Select your Consultancy type" value={showhide} style={{marginBottom:"1rem"}} onChange={handlebudget}>
            {workingWith?.map((e)=>(<Select.Option value={e} key={e}>{e}</Select.Option>))}
            </Select>
          </Form.Item>

          {showhide === 'Career Consultancy' && 
          // (<Input defaultValue="free" name="budget" hidden/>
          (
            <div>
              <label htmlFor="budget" className="text-lg font-semibold ">
               Your Budget
              </label>
              <Form.Item name="budget"
              rules={[
                {
                  required: true,
                  message: "please select a budget",
                },
              ]}>
                <Radio.Group>
                  <Space direction="vertical">
                  {cName === "Md. Shabbir Hossain Bhuiyea (Rossi)"? "" : <Radio value="Free"> Free </Radio> }
                    <Radio value="500 BDT - 1000 BDT"> 500 BDT - 1000 BDT</Radio>
                    <Radio value="1000 BDT - 3000 BDT"> 1000 BDT - 3000 BDT</Radio>
                  </Space>
                </Radio.Group>
              </Form.Item>
            </div>
          )
          }
          
          {showhide === 'Corporate Consultancy' &&
            (
            <div>
              <label htmlFor="problemType" className="text-lg font-semibold ">
               Your Budget
              </label>
              <Form.Item name="budget"
              rules={[
                {
                  required: true,
                  message: "please select a budget",
                },
              ]}>
                <Radio.Group>
                  <Space direction="vertical">
                    <Radio value="60000 BDT - 80000 BDT "> 60000 BDT - 80000 BDT </Radio>
                    <Radio value="80000 BDT - 100000 BDT"> 80000 BDT - 100000 BDT</Radio>
                    <Radio value="More than 100000 BDT"> More than 100000 BDT</Radio>
                  </Space>
                </Radio.Group>
              </Form.Item>
            </div>
            )
          }

          {showhide === '1:1 Mentorship Program' &&
            (
            <div>
              <label htmlFor="budget" className="text-lg font-semibold ">
               Your Budget
              </label>
              <Form.Item name="budget"
              rules={[
                {
                  required: true,
                  message: "please select a budget",
                },
              ]}>
                <Radio.Group>
                  <Space direction="vertical" >
                    <Radio value="Negotiable" defaultChecked={true}> Negotiable</Radio>
                    
                  </Space>
                </Radio.Group>
              </Form.Item>
            </div>
            )
          }
          
          {showhide === 'Research (Thesis/Report/Patent)' &&
            (
            <div>
            <label htmlFor="budget" className="text-lg font-semibold ">
               Your Budget
              </label>
              <Form.Item name="budget"
              rules={[
                {
                  required: true,
                  message: "please select a budget",
                },
              ]}>
                <Radio.Group>
                  <Space direction="vertical">
                    <Radio value="10000 BDT - 20000 BDT"> 10000 BDT - 20000 BDT </Radio>
                    <Radio value="20000 BDT - 30000 BDT"> 20000 BDT - 30000 BDT</Radio>
                    <Radio value="More than 30000 BDT"> More than 30000 BDT</Radio>
                  </Space>
                </Radio.Group>
              </Form.Item>
            </div>
            )
          }
          
          {showhide === 'AI Project (Basic to Advanced)' &&
            (
            <div>
            <label htmlFor="budget" className="text-lg font-semibold ">
               Your Budget
              </label>
              <Form.Item name="budget"
              rules={[
                {
                  required: true,
                  message: "please select a budget",
                },
              ]}>
                <Radio.Group>
                  <Space direction="vertical">
                    <Radio value="12000 BDT - 20000 BDT">12000 BDT - 20000 BDT</Radio>
                    <Radio value="20000 BDT - 30000 BDT">20000 BDT - 30000 BDT</Radio>
                  </Space>
                </Radio.Group>
              </Form.Item>
            </div>
            )
          } 
          

          <label htmlFor="fileLink" className="mb-2 text-lg font-semibold" >
            Attach your file (If any)
          </label>
          <p className="text-red-700">(Please Attach your file drive link)</p>
          <Form.Item
            name="fileLink"
            style={{marginTop:"0.5rem"}}
            rules={[{ type: "url", message: "Please enter a valid url" }]}
            
          >
            <Input placeholder="Add your file drive url (ex. www.example.com)" className="p-2 rounded-md" />
          </Form.Item>

          <label htmlFor="caseSummary" className="text-lg font-semibold " >
            Explain your problem (in details): 
          </label>
          <Form.Item
           name="caseSummary"
           style={{marginTop:"0.5rem"}}
           rules={[
            { required: true, 
              message: "Please write your problem in details" 
            }
            ]}
            hasFeedback 
           >
            <TextArea rows={4} className="rounded-md" />
          </Form.Item>
           <ConfigProvider
              theme={{
                token: {
                  // Seed Token
                  colorPrimary: 'red',
                  borderRadius: 2,
                  colorBorder:'red',
                  controlOutlineWidth:0,
                  // Alias Token
                  colorBgContainer: 'white',
                },
              }}
            >
            
          <Form.Item
            name="urgent"
            wrapperCol={{ span: 24 }}
            style={{marginTop:"2rem"}} 
          >
            <Checkbox.Group className="">
              <Space direction="vertical">
                <Checkbox value="yes" className="text-xl text-red-500">I need urgent consultancy</Checkbox>
              </Space>
            </Checkbox.Group>
              
              {/* <label htmlFor="urgent" ></label> */}
            
           {/* <Input type="checkbox" value="1"  /> */}
            
            </Form.Item>
          </ConfigProvider>
          <button type="submit" className="w-full mt-2 text-white bg-black btn-view">
            Submit
          </button>
          
          {/* <Form.Item >
            <Button block  htmlType="submit" style={{background:"black" , padding:"1.5rem", color:"white"}}>
              Register
            </Button>
          </Form.Item> */}
    </Form>
    </ConfigProvider>
  </div>
  )}
</div>


);
};

export default Expertise;

{/* <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 section">
        <div>
          <label htmlFor="name" className="text-xl font-semibold">
            Your Name*
          </label>
          <input {...register("name", { required: true })} type="text" placeholder="Enter your name"
            className="py-2 px-4 block w-full mt-4 outline-none border border-[#ED1B24]/80" />
        </div>
        <div>
          <label htmlFor="email" className="text-xl font-semibold">
            Email*
          </label>
          <input {...register("email", { required: true })} type="email" value={user?.email}
            placeholder="Enter your email address"
            className="py-2 px-4 block w-full mt-4 outline-none border border-[#ED1B24]/80" />
        </div>
        <div>
          <label htmlFor="phone" className="text-xl font-semibold">
            Phone number*
          </label>
          <input {...register("phone", { required: true })} type="tel" placeholder="Enter your phone number"
            className="py-2 px-4 block w-full mt-4 outline-none border border-[#ED1B24]/80" />
        </div>
        <div>
          <label htmlFor="appointDate" className="text-xl font-semibold">
            Appointment date*
          </label>
          <input {...register("appointDate", { required: true })} type="date" placeholder="Select an appointment date"
            className="py-2 px-4 block w-full mt-4 outline-none border border-[#ED1B24]/80" />
        </div>
        <div>
          <label htmlFor="appointTime" className="text-xl font-semibold">
            Estimated time*
          </label>
         
          <select {...register("appointTime", { required: true })} 
            className="py-3 appearance-none px-4 block w-full mt-4 outline-none border border-[#ED1B24]/80">
            {workingWith?.map((d) => (
              <option value={d} key={d}>{d}</option>
            ))
            }
          </select>
        </div>
        <div>
          <label htmlFor="problemType" className="text-xl font-semibold">
            Type of Consultancy*
          </label>
          <select {...register("problemType", { required: true })} value={showhide}
            className="py-3 appearance-none px-4 block w-full mt-4 outline-none border border-[#ED1B24]/80" onChange={handlebudget}>
            {workingWith?.map((d) => (
              <option value={d} key={d}>{d}</option>
            ))
            }
          </select>
        </div>
        {showhide === 'Career Consultancy' && (<input type="hidden" {...register("budget")} value="free" />)}
    
        {showhide === 'Research (Thesis/Report/Patent)' &&
        (
        <div>
         <label htmlFor="problemType" className="text-xl font-semibold ">
          Your Budget*
        </label>
          <label className="flex items-center gap-2 mt-4 text-lg ">
            <input
              type="radio"
              {...register("budget")}
              value="1000 - 10000 Tk"
              className="radio"
              required
            />
            1000 - 10000 Tk
          </label>
          <label className="flex items-center gap-2 text-lg ">
            <input
              type="radio"
              {...register("budget")}
              value="10000 - 20000 Tk"
              className="radio"
              required
            />
            10000 - 20000 Tk
          </label>
          <label className="flex items-center gap-2 text-lg ">
            <input
              type="radio"
              {...register("budget")}
              value="21000 - 30000 Tk"
              className="radio"
              required
            />
            21000 - 30000 Tk
          </label>
        </div>
        )
      }

      {showhide === '1:1 Mentorship Program' &&
        (
        <div>
         <label htmlFor="problemType" className="text-xl font-semibold ">
          Your Budget*
        </label>
          <label className="flex items-center gap-2 mt-4 text-lg ">
            <input
              type="radio"
              {...register("budget")}
              value="module"
              className="radio"
              required
            />
            1000 - 10000 Tk
          </label>
          <label className="flex items-center gap-2 text-lg ">
            <input
              type="radio"
              {...register("budget")}
              value="module"
              className="radio"
              required
            />
            10000 - 20000 Tk
          </label>
          <label className="flex items-center gap-2 text-lg ">
            <input
              type="radio"
              {...register("budget")}
              value="module"
              className="radio"
              required
            />
            21000 - 30000 Tk
          </label>
        </div>
        )
      }

      {showhide === 'AI Project(Basic to Advanced)' &&
        (
        <div>
         <label htmlFor="problemType" className="text-xl font-semibold ">
          Your Budget*
        </label>
          <label className="flex items-center gap-2 mt-4 text-lg ">
            <input
              type="radio"
              {...register("budget")}
              value="module"
              className="radio"
              required
            />
            1000 - 10000 Tk
          </label>
          <label className="flex items-center gap-2 text-lg ">
            <input
              type="radio"
              {...register("budget")}
              value="module"
              className="radio"
              required
            />
            10000 - 20000 Tk
          </label>
          <label className="flex items-center gap-2 text-lg ">
            <input
              type="radio"
              {...register("budget")}
              value="module"
              className="radio"
              required
            />
            21000 - 30000 Tk
          </label>
        </div>
        )
      } 
      {showhide === 'Corporate Consultancy' &&
        (
        <div>
         <label htmlFor="problemType" className="text-xl font-semibold ">
          Your Budget*
        </label>
          <label className="flex items-center gap-2 mt-4 text-lg ">
            <input
              type="radio"
              {...register("budget")}
              value="module"
              className="radio"
              required
            />
            1000 - 10000 Tk
          </label>
          <label className="flex items-center gap-2 text-lg ">
            <input
              type="radio"
              {...register("budget")}
              value="module"
              className="radio"
              required
            />
            10000 - 20000 Tk
          </label>
          <label className="flex items-center gap-2 text-lg ">
            <input
              type="radio"
              {...register("budget")}
              value="module"
              className="radio"
              required
            />
            21000 - 30000 Tk
          </label>
        </div>
        )
      }
        <div>
          <label htmlFor="fileLink" className="text-xl font-semibold">
            Insert a file link (optional)
          </label>
          <input {...register("fileLink")} type="url" placeholder="Enter a file link (optional)"
            className="py-2 px-4 block w-full mt-4 outline-none border border-[#ED1B24]/80" />
        </div>
        <div>
          <label htmlFor="caseSummary" className="text-xl font-semibold">
            Case summary (optional)
          </label>
          <textarea {...register("caseSummary")} placeholder="Enter case summary (optional)" rows="4"
            className="py-2 px-4 block w-full mt-4 outline-none border border-[#ED1B24]/80"></textarea>
        </div>
        <div className="flex items-center">
          <label htmlFor="urgent" className="mr-2 text-xl text-primary">
            Is it urgent?
          </label>
          <input {...register("urgent")} type="checkbox" className="checkbox checkbox-xs checkbox-error" />
        </div>

        <div className="flex justify-center">
          <button type="submit" className="btn-view">
            Submit
          </button>
        </div>
      </form> */}
{/* <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 section">
      <div>
        <label htmlFor="name" className="text-xl font-semibold">
         Your Name*
        </label>
        <input {...register("name", { required: true })} type="text" value={user?.displayName}  defaultValue={user?.displayName} placeholder="Enter your name"
          className="py-2 px-4 block w-full mt-4 outline-none border border-[#ED1B24]/80"  />
      </div>
      <div>
        <label htmlFor="email" className="text-xl font-semibold">
          Email*
        </label>
        <input {...register("email", { required: true })} defaultValue={user?.email} readOnly type="email"
          placeholder={user?.email}
          className="py-2 px-4 block w-full mt-4 outline-none border border-[#ED1B24]/80" />
      </div>
      <div>
        <label htmlFor="phone" className="text-xl font-semibold">
          Phone number*
        </label>
        <input {...register("phone", { required: true })} type="tel" placeholder="Enter your phone number"
          className="py-2 px-4 block w-full mt-4 outline-none border border-[#ED1B24]/80" />
      </div>
      <div>
        <label htmlFor="appointDate" className="text-xl font-semibold">
          appointment date*
        </label>
        <input {...register("appointDate", { required: true })} type="date" placeholder="Select an appointment date"
          className="py-2 px-4 block w-full mt-4 outline-none border border-[#ED1B24]/80" />
      </div>
      <div>
        <label htmlFor="appointTime" className="text-xl font-semibold">
          Select your Schedule*
        </label>
        
        <input {...register("appointTime", { required: true })} type="time" placeholder="Select an appointment time"
          className="py-2 px-4 block w-full mt-4 outline-none border border-[#ED1B24]/80" />
      </div>
      
      <div>
        <label htmlFor="problemType" className="text-xl font-semibold">
          Type of consultancy*
        </label>
        <select {...register("problemType", { required: true })} value={showhide}
          className="py-3 appearance-none px-4 block w-full mt-4 outline-none border border-[#ED1B24]/80"  onChange={handlebudget}>
          {workingWith?.map((d) => (
            <option value={d} key={d}>{d}</option>
            ))
          }
        </select>
      </div>
      
      {showhide === 'Career Consultancy' && (<input type="hidden" {...register("budget")} value="free" />)}
      {showhide === 'Research (Thesis/Report/Patent)' &&
        (
        <div>
         <label htmlFor="problemType" className="text-xl font-semibold ">
          Your Budget*
        </label>
          <label className="flex items-center gap-2 mt-4 text-lg ">
            <input
              type="radio"
              {...register("budget")}
              value="1000 - 10000 Tk"
              className="radio"
              required
            />
            1000 - 10000 Tk
          </label>
          <label className="flex items-center gap-2 text-lg ">
            <input
              type="radio"
              {...register("budget")}
              value="10000 - 20000 Tk"
              className="radio"
              required
            />
            10000 - 20000 Tk
          </label>
          <label className="flex items-center gap-2 text-lg ">
            <input
              type="radio"
              {...register("budget")}
              value="21000 - 30000 Tk"
              className="radio"
              required
            />
            21000 - 30000 Tk
          </label>
        </div>
        )
      }

      {showhide === '1:1 Mentorship Program' &&
        (
        <div>
         <label htmlFor="problemType" className="text-xl font-semibold ">
          Your Budget*
        </label>
          <label className="flex items-center gap-2 mt-4 text-lg ">
            <input
              type="radio"
              {...register("budget")}
              value="module"
              className="radio"
              required
            />
            1000 - 10000 Tk
          </label>
          <label className="flex items-center gap-2 text-lg ">
            <input
              type="radio"
              {...register("budget")}
              value="module"
              className="radio"
              required
            />
            10000 - 20000 Tk
          </label>
          <label className="flex items-center gap-2 text-lg ">
            <input
              type="radio"
              {...register("budget")}
              value="module"
              className="radio"
              required
            />
            21000 - 30000 Tk
          </label>
        </div>
        )
      }

      {showhide === 'AI Project (Basic to Advanced)' &&
        (
        <div>
         <label htmlFor="problemType" className="text-xl font-semibold ">
          Your Budget*
        </label>
          <label className="flex items-center gap-2 mt-4 text-lg ">
            <input
              type="radio"
              {...register("budget")}
              value="module"
              className="radio"
              required
            />
            1000 - 10000 Tk
          </label>
          <label className="flex items-center gap-2 text-lg ">
            <input
              type="radio"
              {...register("budget")}
              value="module"
              className="radio"
              required
            />
            10000 - 20000 Tk
          </label>
          <label className="flex items-center gap-2 text-lg ">
            <input
              type="radio"
              {...register("budget")}
              value="module"
              className="radio"
              required
            />
            21000 - 30000 Tk
          </label>
        </div>
        )
      } 
      {showhide === 'Corporate Consultancy' &&
        (
        <div>
         <label htmlFor="problemType" className="text-xl font-semibold ">
          Your Budget*
        </label>
          <label className="flex items-center gap-2 mt-4 text-lg ">
            <input
              type="radio"
              {...register("budget")}
              value="module"
              className="radio"
              required
            />
            1000 - 10000 Tk
          </label>
          <label className="flex items-center gap-2 text-lg ">
            <input
              type="radio"
              {...register("budget")}
              value="module"
              className="radio"
              required
            />
            10000 - 20000 Tk
          </label>
          <label className="flex items-center gap-2 text-lg ">
            <input
              type="radio"
              {...register("budget")}
              value="module"
              className="radio"
              required
            />
            21000 - 30000 Tk
          </label>
        </div>
        )
      }
      
      <div>
        <label htmlFor="caseSummary" className="text-xl font-semibold">
          Explain Your Problem (In details):
        </label>
        <textarea {...register("caseSummary", { required: true })} placeholder="Enter case summary (optional)" rows="4"
          className="py-2 px-4 block w-full mt-4 outline-none border border-[#ED1B24]/80"></textarea>
      </div>
      <div>
        <label htmlFor="fileLink" className="text-xl font-semibold">
          Attach Your File (If any)
        </label>
        <p className="text-red-700">(please attach your drive link)</p>
        <input {...register("fileLink")} type="url" placeholder="Attach your file link"
          className="py-2 px-4 block w-full mt-4 outline-none border border-[#ED1B24]/80" />
      </div>
      <div className="flex items-center">
        <label htmlFor="urgent" className="mr-2 text-xl text-primary">
          Is it urgent?
        </label>
        <input {...register("urgent")} type="checkbox" className="checkbox checkbox-xs checkbox-error" />
      </div>

      <div className="flex justify-center">
        <button type="submit" className="btn-view">
          Submit
        </button>
      </div>
    </form> */}