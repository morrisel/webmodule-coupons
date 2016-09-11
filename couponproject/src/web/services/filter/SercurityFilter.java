package web.services.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.ws.rs.core.MediaType;

import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;

@WebFilter(urlPatterns = { "/coupons/*" })
public class SercurityFilter implements Filter {

	public SercurityFilter() {
		// TODO Auto-generated constructor stub
	}

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		// TODO Auto-generated method stub
	}

	@Override
	public void destroy() {
		// TODO Auto-generated method stub
	}

	@Override
	public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain)
			throws IOException, ServletException {

		boolean block = false;

		if (!block) {
			block = filtrate("/couponproject/coupons/admin"
					, "/couponproject/coupons/admin/login", "adminFacade",
					"admin", req, resp, chain);
		} else {
			return;
		}

		if (!block) {
			block = filtrate("/couponproject/coupons/company", "/couponproject/coupons/company/login", "companyFacade",
					"company", req, resp, chain);
		} else {
			return;
		}

		if (!block) {
			block = filtrate("/couponproject/coupons/customer", "/couponproject/coupons/customer/login",
					"customerFacade", "customer", req, resp, chain);
		} else {
			return;
		}
		
		chain.doFilter(req, resp);
		
	}

	private boolean filtrate(String serviceurl, String loginurl, String facadetype, String usertype, ServletRequest req,
			ServletResponse resp, FilterChain chain) throws IOException, ServletException {
		//System.out.println("filtrate is running...");
		// you must CAST the input to the right type first
		HttpServletRequest request = (HttpServletRequest) req;
		HttpServletResponse response = (HttpServletResponse) resp;

		// validate the user is NOT trying to login, otherwise keep filtering
		String url = request.getRequestURI();
		if (url.startsWith(serviceurl) && !url.startsWith(loginurl)) {
			HttpSession session = request.getSession(false);
			if (session == null || session.getAttribute(facadetype) == null) {
				response.setStatus(500);
				// 3rd party jar
				JSONObject jso = new JSONObject();
				try {
					jso.put("message", "-filter block- you must log in as " + usertype + " first!");
				} catch (JSONException e) {
					e.printStackTrace();
				}
				response.getWriter().print(jso.toString());
				response.setContentType(MediaType.APPLICATION_JSON);

				return true;
			}
		}
		return false;
	}

}
