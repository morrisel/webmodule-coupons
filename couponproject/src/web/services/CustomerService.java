package web.services;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.Coupon;
import beans.CouponSystemException;
import beans.CouponType;
import couponSystemSingelton.CouponSystem;
import facade.CouponClientFacade;
import facade.CustomerFacade;
import web.beans.LoginBean;
import web.beans.Message;

@Path("/customer")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class CustomerService {

	private String TypeOfClient = "Customer";
	private Coupon coupon = new Coupon();

	public CustomerService() {
	}

	/**
	 * Extract facade from session
	 * 
	 * @param HttpServletRequest
	 * @return CustomerFacade
	 */
	private CustomerFacade getCustomerFacade(HttpServletRequest req) {
		CustomerFacade facade = (CustomerFacade) req.getSession().getAttribute("customerFacade");
		return facade;
	}

	/**
	 * Login as customer, inject customer facade into session
	 * 
	 * @param LoginBean
	 * @param HttpServletRequest
	 * @return Message
	 * @throws CouponSystemException
	 */
	@Path("/login")
	@POST
	public Message customerLogin(LoginBean loginBean, @Context HttpServletRequest req) throws CouponSystemException {
		CouponClientFacade facade = CouponSystem.getInstace().login(loginBean.getLogin(), loginBean.getPassword(),
				this.TypeOfClient);
		HttpSession session = req.getSession(true);
		session.setAttribute("castomerFacade", facade);
		return new Message("Logged in successfully as: " + loginBean.getLogin());
	}

	/**
	 * 
	 * @param req
	 * @return
	 * @throws CouponSystemException
	 */
	@Path("/logout")
	@POST
	public Message adminLogout(@Context HttpServletRequest req) throws CouponSystemException {
		HttpSession session = req.getSession(false);
		session.setAttribute("customerFacade", null);
		return new Message("Logged out successfully");
	}

	/**
	 * 
	 * @param req
	 * @param id
	 * @return
	 * @throws CouponSystemException
	 */
	@Path("/purchaseCoupon/{id}")
	@POST
	public Message purchaseCoupon(@Context HttpServletRequest req, @PathParam("id") long id)
			throws CouponSystemException {
		coupon.setId(id);
		getCustomerFacade(req).purchaseCoupon(coupon);
		return new Message("successfully acquired coupon #" + id);
	}

	/**
	 * Get all coupons
	 * 
	 * @param HttpServletRequest
	 * @return array of coupons via json
	 * @throws CouponSystemException
	 */
	@Path("/allPurchasedCoupons")
	@GET
	public Coupon[] getAllPurchasedCoupons(@Context HttpServletRequest req) throws CouponSystemException {
		Coupon[] coupons = getCustomerFacade(req).getAllPurchasedCoupons().toArray(new Coupon[0]);
		return coupons;
	}

	/**
	 * 
	 * @param HttpServletRequest
	 * @param CouponType
	 * @return
	 * @throws CouponSystemException
	 */
	// @Path("/allPurchasedCouponsByType")
	@Path("/allPurchasedCouponsByType/{couponType}")
	@GET
	public Coupon[] getAllPurchasedCouponsByType(@Context HttpServletRequest req,
			@PathParam("couponType") String couponType) throws CouponSystemException {
		Coupon[] coupons = getCustomerFacade(req)
				.getAllPurchasedCouponsByType(CouponType.valueOf(couponType.toUpperCase())).toArray(new Coupon[0]);
		return coupons;
	}

	/**
	 * 
	 * @param req
	 * @param price
	 * @return
	 * @throws CouponSystemException
	 */
	@Path("/allPurchasedCouponsByPrice/{price}")
	@GET
	public Coupon[] getAllPurchasedCouponsByPrice(@Context HttpServletRequest req, @PathParam("price") double price)
			throws CouponSystemException {
		Coupon[] coupons = getCustomerFacade(req).getAllPurchasedCouponsByPrice(price).toArray(new Coupon[0]);
		return coupons;
	}
}