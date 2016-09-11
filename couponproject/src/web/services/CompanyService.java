package web.services;

import java.sql.Date;

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
import beans.Coupon;
import beans.CouponSystemException;
import beans.CouponType;
import couponSystemSingelton.CouponSystem;
import facade.CompanyFacade;
import facade.CouponClientFacade;
import web.beans.LoginBean;
import web.beans.Message;

@Path("/company")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class CompanyService {

	private String typeOfClient = "Company";

	// bean layer
	private Coupon coupon = new Coupon();
	private Company company = new Company();
	// private CompanyFacade companyFacade;

	public CompanyService() {
		// TODO Auto-generated constructor stub
	}

	/**
	 * Extract facade from session
	 * 
	 * @param HttpServletRequest
	 * @return CompanyFacade
	 */
	private CompanyFacade getCompanyFacade(HttpServletRequest req) {
		// CompanyFacade companyFacade = new CompanyFacade(company);
		CompanyFacade companyFacade = (CompanyFacade) req.getSession().getAttribute("companyFacade");
		return companyFacade;
		// temp facade getter for sessionless checking
		// String login="BestShit";
		// String password="1234";
		// CouponClientFacade facade;
		// try {
		// facade = CouponSystem.getInstance().login(login, password,
		// TypeOfClient.CUSTOMER);
		// return (CompanyFacade)facade;
		// } catch (CouponSystemException e) {
		// System.err.println("couldn't get facade");
		// }
		// return null;
	}

	@Path("/login")
	@POST
	public Message companyLogin(LoginBean loginBean, @Context HttpServletRequest req) throws CouponSystemException {
		CouponClientFacade facade = CouponSystem.getInstace().login(loginBean.getLogin(), loginBean.getPassword(),
				this.typeOfClient);

		HttpSession session = req.getSession(true);
		session.setAttribute("companyFacade", facade);
		return new Message("Logged in successfully as: " + loginBean.getLogin());
	}

	@Path("/logout")
	@POST
	public Message adminLogout(@Context HttpServletRequest req) throws CouponSystemException {
		HttpSession session = req.getSession(false);
		session.setAttribute("companyFacade", null);
		return new Message("Logged out successfully");
	}

	@Path("/createCoupon")
	@POST
	public Message createCoupon(Coupon coupon, @Context HttpServletRequest req) throws CouponSystemException {
		getCompanyFacade(req).createCoupon(coupon);
		return new Message("The coupon " + coupon.getTitle() + " created successfully.");
	}

	@Path("/removeCoupon/{id}")
	@DELETE
	public Message removeCoupon(@PathParam("id") long id, @Context HttpServletRequest req)
			throws CouponSystemException {
		coupon.setId(id);
		getCompanyFacade(req).removeCoupon(coupon);
		return new Message("The coupon " + id + " removed successfully.");
	}

	@Path("/updateCoupon/{id}/{endDate}/{price}")
	@PUT
	public Message updateCoupon(@PathParam("id") long id, @PathParam("endDate") Date endDate,
			@PathParam("price") double price, @Context HttpServletRequest req) throws CouponSystemException {
		coupon.setId(id);
		coupon.setEndDate(endDate);
		coupon.setPrice(price);
		getCompanyFacade(req).updateCoupon(coupon);
		return new Message("The coupon " + id + " updated successfully.");
	}

	@Path("/getCoupon/{id}")
	@GET
	public Coupon getCoupon(@PathParam("id") long id, @Context HttpServletRequest req) throws CouponSystemException {
		return getCompanyFacade(req).getCoupon(id);
	}

	@Path("/getAllCoupons")
	@GET
	public Coupon[] getAllCoupons(@Context HttpServletRequest req) throws CouponSystemException {
		// company = getCompanyFacade(req).getCompany();
		return getCompanyFacade(req).getAllCoupons().toArray(new Coupon[0]);
	}

	@Path("/getCouponByType/{type}")
	@GET
	public Coupon[] getCouponByType(@PathParam("type") String type, @Context HttpServletRequest req)
			throws CouponSystemException {
		// company = getCompanyFacade(req).getCompany();
		// CompanyFacade facade = new CompanyFacade(company);
		return getCompanyFacade(req).getCouponByType(CouponType.valueOf(type.toUpperCase())).toArray(new Coupon[0]);
	}

	@Path("/getCouponByType/{price}")
	@GET
	public Coupon[] getCouponUpToPrice(@PathParam("price") double price, @Context HttpServletRequest req)
			throws CouponSystemException {
		// company = getCompanyFacade(req).getCompany();
		// CompanyFacade facade = new CompanyFacade(company);
		return getCompanyFacade(req).getCouponUpToPrice(price).toArray(new Coupon[0]);
	}

	@Path("/getCouponByType/{date}")
	@GET
	public Coupon[] getCouponUpToDate(@PathParam("date") Date date, @Context HttpServletRequest req)
			throws CouponSystemException {
		// company = getCompanyFacade(req).getCompany();
		// CompanyFacade facade = new CompanyFacade(company);
		return getCompanyFacade(req).getCouponUpToDate(date).toArray(new Coupon[0]);
	}

}