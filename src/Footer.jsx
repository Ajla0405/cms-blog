import React, { useState, useEffect } from "react";
import { createClient } from "contentful";
import "./Footer.css";

const client = createClient({
  space: import.meta.env.VITE_SPACE_ID,
  accessToken: import.meta.env.VITE_CONTENTFUL_KEY,
});

function Footer() {
  const [footerData, setFooterData] = useState(null);

  useEffect(() => {
    client
      .getEntries({
        content_type: "footer",
      })
      .then((response) => {
        if (response.items && response.items[0]) {
          setFooterData(response.items[0].fields);
        }
      })
      .catch((error) => {
        console.error("Error fetching footer data:", error);
      });
  }, []);

  if (!footerData) {
    return null;
  }

  const { cookiePolicy, dataSecurity, undefinedField, year } = footerData;

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-item">
          <p>{cookiePolicy}</p>
        </div>
        <div className="footer-item">
          <p>{dataSecurity}</p>
        </div>
        <div className="footer-item">
          <p>{undefinedField}</p>
        </div>
        <div className="footer-item">
          <p>&copy; {year}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
