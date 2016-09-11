package web.services;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.Company;
import beans.CouponSystemException;
import beans.Customer;
import couponSystemSingelton.CouponSystem;
import facade.AdminFacade;
import facade.CouponClientFacade;
import web.beans.LoginBean;
import web.beans.Message;

@Path("/admin")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class AdminService {

	// bean layer
	private Customer customerBean;
	private Company companyBean;
	//private String TypeOfClient = "admin";

//	public AdminService() {
//	}

	/**
	 * extract facade from session
	 * 
	 * @param req
	 * @return adminFacade
	 */
	private AdminFacade getAdminFacade(HttpServletRequest req) {

		System.out.println("getAdminFacade");
		AdminFacade facade = (AdminFacade) req.getSession().getAttribute("adminFacade");
		return facade;

//		AdminFacade facade=null;
//		 try {
//		 facade = (AdminFacade) CouponSystem.getInstace().login("admin", "1234", "admin");
//		 return (AdminFacade) facade;
//		 } catch (CouponSystemException e) {
//		 System.out.println("Couldn't get facade " + e);
//		 return null;
//		 }
	}

	/**
	 * 
	 * @param lgb
	 * @param req
	 * @return message
	 * @throws CouponSystemException
	 */
	@Path("/login")
	@POST
	public Message adminLogin(LoginBean lgb, @Context HttpServletRequest req) throws CouponSystemException {
//		LoginBean lgb,
		System.out.println("adminLogin is running");
//		
		LoginBean lgb1=new LoginBean();
		lgb1.setPassword("1234");
		lgb1.setLogin("admin");
				
		
		CouponClientFacade facade = CouponSystem.getInstace().
				login(lgb.getLogin(), lgb.getPassword(),	"admin");
		
		HttpSession session = req.getSession(true);
		
		session.setAttribute("adminFacade", facade);
		
		return new Message("Logged in successfully as admin");
	}

	/**
	 * 
	 * @param req
	 * @return message
	 * @throws CouponSystemException
	 */
	@Path("/logout")
	@POST
	public Message adminLogout(@Context HttpServletRequest req) throws CouponSystemException {
		
		System.out.println("LOGOUT is running");
		
		HttpSession session = req.getSession(false);
		session.setAttribute("adminFacade", null);
		return new Message("Logged out successfully as admin");
	}

	///////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////// COMPANY
	///////////////////////////////////////////////////////////////////////////
	@Path("/createCompany")
	@POST
	// /couponsys/couponsystemadmin/createnewcompany
	public Message createCompany(Company company, @Context HttpServletRequest req) throws CouponSystemException {
	//public Message createCompany(Company company, @Context HttpServletRequest req) throws CouponSystemException {	
		System.out.println("createCompany running");
		getAdminFacade(req).createCompany(company);
		return new Message("The company " + company.getCompName() + " created successfully.");
	}

	// @Path("/removecompany/{id}")
	// public Message removeCompany(@PathParam("id")long x, @Context
	// HttpServletRequest req)
	// (@PathParam("id")long x,
	@Path("/removeCompany")
	@DELETE
	public Message removeCompany(Company company, @Context HttpServletRequest req) throws CouponSystemException {
		companyBean = getAdminFacade(req).getCompany(company.getId());
		getAdminFacade(req).removeCompany(companyBean);
		return new Message("The company " + companyBean.getCompName() + " deleted successfully.");
	}

	@Path("/updateCompany")
	@PUT
	public Message updateCompany(Company company, @Context HttpServletRequest req) throws CouponSystemException {
		getAdminFacade(req).updateCompany(company);
		return new Message("The company " + company.getCompName() + " updated successfully.");
	}

	@Path("/getCompany/{id}")
	@GET
	public Company getCompany(@PathParam("id") long id, @Context HttpServletRequest req) throws CouponSystemException {
		return getAdminFacade(req).getCompany(id);
	}

	@Path("/getAllCompanies")
	@GET
	public Company[] getAllCompanies(@Context HttpServletRequest req) throws CouponSystemException {
		return getAdminFacade(req).getAllCompanies().toArray(new Company[0]);
	}

	///////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////// CUSTOMER
	///////////////////////////////////////////////////////////////////////////

	@Path("/createCustomer")
	@POST
	public Message createCustomer(Customer customer, @Context HttpServletRequest req) throws CouponSystemException {
		getAdminFacade(req).createCustomer(customer);
		return new Message("The customer " + customer.getCustName() + " created successfully.");
	}

	// @Path("/removecustomer/{id}")
	// public Message removeCompany(@PathParam("id")long x, @Context
	// HttpServletRequest req)
	// (@PathParam("id")long x,
	@Path("/removeCustomer/{id}")
	@DELETE
	public Message removeCustomer(@PathParam("id") long id, @Context HttpServletRequest req)
			throws CouponSystemException {
		customerBean = getAdminFacade(req).getCustomer(id);
		getAdminFacade(req).removeCustomer(customerBean);
		return new Message("The customer " + customerBean.getCustName() + " deleted successfully.");
	}

	@Path("/updateCustomer")
	@PUT
	public Message updateCustomer(Customer customer, @Context HttpServletRequest req) throws CouponSystemException {
		getAdminFacade(req).updateCustomer(customer);
		return new Message("The customer " + customer.getCustName() + " updated successfully.");
	}

	@Path("/getCustomer/{id}")
	@GET
	public Customer getCustomer(@PathParam("id") long id, @Context HttpServletRequest req)
			throws CouponSystemException {
		return getAdminFacade(req).getCustomer(id);
	}

	@Path("/getAllCustomers")
	@GET
	public Customer[] getAllCustomers(@Context HttpServletRequest req) throws CouponSystemException {
		return getAdminFacade(req).getAllCompanies().toArray(new Customer[0]);
	}

}