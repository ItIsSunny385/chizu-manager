import { type NextPage } from "next";
import React from "react";
import H2 from "../components/H2";

const About: NextPage = () => {
  return (
    <React.Fragment>
      <div className="my-5">
        <H2>ライセンス</H2>
        <p>
          このウェブサイトのソースコードには、GNU Lesser General Public License
          v3.0 で配布されたソースコードが含まれています。ソースコードは以下の
          URL で公開しています。
        </p>
        <p>
          <a href="https://github.com/ItIsSunny385/chizu-manager">
            https://github.com/ItIsSunny385/chizu-manager
          </a>
        </p>
      </div>
    </React.Fragment>
  );
};

export default About;
