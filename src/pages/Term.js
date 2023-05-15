import { useTheme } from "@emotion/react";
import { Box, Button, Container, Typography, useMediaQuery } from "@mui/material";
import React, { useState } from "react";

const Term = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [language, setLanguage] = useState(true);

  const handleChange = () => {
    setLanguage(!language);
  };

  return (
    <>
      <Container component="main" maxWidth="md">
        <Box width={isMobile ? "300px" : "100%"} sx={{ border: "1px solid black", borderRadius: 2, p: 2, mb: 2 }}>
          <Box textAlign="center">
            <Typography variant="h4">Terms of Service</Typography>
          </Box>
          <Box textAlign="right">
            <Button variant={language ? "contained" : "outlined"} color="info" onClick={handleChange}>
              {language ? <div>Japanese</div> : <div>English</div>}
            </Button>
          </Box>
          {language ? (
            <div>
              <h2>Terms of Service</h2>

              <p>
                These Terms of Service ("Terms") govern your use of the services provided by Motive Diary ("the
                Service"). By accessing or using the Service, you agree to be bound by these Terms.
              </p>

              <h3>Acceptance of Terms</h3>
              <p>
                By using the Service, you represent that you have read, understood, and agree to be bound by these
                Terms. If you do not agree to these Terms, you may not use the Service.
              </p>

              <h3>Description of Service</h3>
              <p>
                The Service provided by Motive Diary allows users to write diary and share. The Service may include, but
                is not limited to, write diary ,share, see other's diary.
              </p>

              <h3>User Responsibilities</h3>
              <h4>3.1 Account Registration</h4>

              <p>
                In order to use the Service, you may be required to create an account. You must provide accurate and
                complete information when registering for an account. You are responsible for maintaining the
                confidentiality of your account credentials and for all activities that occur under your account. You
                agree to notify Motive Diary immediately of any unauthorized use of your account.
              </p>

              <h4>3.2 Prohibited Conduct</h4>

              <p>You agree not to engage in any of the following prohibited activities while using the Service:</p>

              <ol>
                <li>Violating any applicable laws or regulations</li>
                <li>Infringing upon the rights of others</li>
                <li>Uploading or transmitting viruses or any other malicious code</li>
                <li>Interfering with or disrupting the Service or the servers or networks connected to the Service</li>
                <li>Engaging in any form of automated data collection or extraction</li>
                <li>Intellectual Property</li>
              </ol>
              <p>
                All intellectual property rights in the Service, including but not limited to copyrights, trademarks,
                and patents, shall remain the exclusive property of Motive Diary. You are granted a limited,
                non-exclusive, non-transferable license to use the Service solely for your own personal or internal
                business purposes.
              </p>

              <h3>Disclaimer of Warranty</h3>
              <p>
                The Service is provided on an "as is" and "as available" basis without warranties of any kind, either
                express or implied. Motive Diary does not warrant that the Service will be uninterrupted, error-free, or
                secure.
              </p>

              <h3>Limitation of Liability</h3>
              <p>
                In no event shall Motive Diary be liable for any direct, indirect, incidental, special, or consequential
                damages arising out of or in any way connected with the use of the Service.
              </p>

              <h3>Modification of Terms</h3>
              <p>
                Motive Diary reserves the right to modify these Terms at any time. Any changes to the Terms will be
                effective immediately upon posting on the Service. Your continued use of the Service after the posting
                of any changes constitutes your acceptance of the modified Terms.
              </p>

              <h3>Governing Law</h3>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of Japan, without regard to
                its conflict of law provisions.
              </p>

              <h3>Severability</h3>
              <p>
                If any provision of these Terms is held to be invalid, illegal, or unenforceable, the validity,
                legality, and enforceability of the remaining provisions shall not be affected or impaired.
              </p>
              <h2>We shall not be liable for any damages incurred, regardless of the circumstances.</h2>
            </div>
          ) : (
            <div>
              <h2>利用規約</h2>
              <p>
                この利用規約（以下，「本規約」といいます。）は，Motive
                Diary（以下，「当社」といいます。）がこのウェブサイト上で提供するサービス（以下，「本サービス」といいます。）の利用条件を定めるものです。登録ユーザーの皆さま（以下，「ユーザー」といいます。）には，本規約に従って，本サービスをご利用いただきます。
              </p>
              <h3>第1条（適用） </h3>
              <p>本規約は，ユーザーと当社との間の本サービスの利用に関わる一切の関係に適用されるものとします。</p>
              <p>
                当社は本サービスに関し，本規約のほか，ご利用にあたってのルール等，各種の定め（以下，「個別規定」といいます。）をすることがあります。これら個別規定はその名称のいかんに関わらず，本規約の一部を構成するものとします。
                本規約の規定が前条の個別規定の規定と矛盾する場合には，個別規定において特段の定めなき限り，個別規定の規定が優先されるものとします。
              </p>
              <h3>第2条（利用登録）</h3>
              <p>
                本サービスにおいては，登録希望者が本規約に同意の上，当社の定める方法によって利用登録を申請し，当社がこれを承認することによって，利用登録が完了するものとします。
              </p>
              <p>
                当社は，利用登録の申請者に以下の事由があると判断した場合，利用登録の申請を承認しないことがあり，その理由については一切の開示義務を負わないものとします。
              </p>
              <ul>
                <li>利用登録の申請に際して虚偽の事項を届け出た場合 本規約に違反したことがある者からの申請である場合</li>
                <li>その他，当社が利用登録を相当でないと判断した場合</li>
              </ul>
              <h3>第3条（ユーザーIDおよびパスワードの管理）</h3>
              <p>
                ユーザーは，自己の責任において，本サービスのユーザーIDおよびパスワードを適切に管理するものとします。
              </p>
              <p>
                ユーザーは，いかなる場合にも，ユーザーIDおよびパスワードを第三者に譲渡または貸与し，もしくは第三者と共用することはできません。
              </p>
              <p>
                当社は，ユーザーIDとパスワードの組み合わせが登録情報と一致してログインされた場合には，そのユーザーIDを登録しているユーザー自身による利用とみなします。
              </p>
              <p>
                ユーザーID及びパスワードが第三者によって使用されたことによって生じた損害は，当社に故意又は重大な過失がある場合を除き，当社は一切の責任を負わないものとします。
              </p>
              <h3>第4条（利用料金および支払方法）</h3>
              <p>
                本サービスにかかる利用料金はなく、また本サービスに関わる利用料金が発生する場合は本規約を更新し、追って連絡するものとする。
              </p>
              <h3>第5条（禁止事項）</h3>
              <p>ユーザーは，本サービスの利用にあたり，以下の行為をしてはなりません。</p>
              <ol>
                <li>法令または公序良俗に違反する行為 犯罪行為に関連する行為</li>
                <li>本サービスの内容等，本サービスに含まれる著作権，商標権ほか知的財産権を侵害する行為</li>
                <li>
                  当社，ほかのユーザー，またはその他第三者のサーバーまたはネットワークの機能を破壊したり，妨害したりする行為
                </li>
                <li>
                  本サービスによって得られた情報を商業的に利用する行為 当社のサービスの運営を妨害するおそれのある行為
                </li>
                <li>不正アクセスをし，またはこれを試みる行為 他のユーザーに関する個人情報等を収集または蓄積する行為</li>
                <li>不正な目的を持って本サービスを利用する行為</li>
                <li>本サービスの他のユーザーまたはその他の第三者に不利益，損害，不快感を与える行為</li>
                <li>他のユーザーに成りすます行為 当社が許諾しない本サービス上での宣伝，広告，勧誘，または営業行為</li>
                <li>面識のない異性との出会いを目的とした行為</li>
                <li>当社のサービスに関連して，反社会的勢力に対して直接または間接に利益を供与する行為</li>
                <li>その他，当社が不適切と判断する行為</li>
              </ol>
              <h3>第6条（本サービスの提供の停止等）</h3>
              <p>
                当社は，以下のいずれかの事由があると判断した場合，ユーザーに事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。
              </p>
              <ul>
                <li>本サービスにかかるコンピュータシステムの保守点検または更新を行う場合</li>
                <li>地震，落雷，火災，停電または天災などの不可抗力により，本サービスの提供が困難となった場合</li>
                <li>
                  コンピュータまたは通信回線等が事故により停止した場合
                  その他，当社が本サービスの提供が困難と判断した場合
                </li>
              </ul>
              <p>
                当社は，本サービスの提供の停止または中断により，ユーザーまたは第三者が被ったいかなる不利益または損害についても，一切の責任を負わないものとします。
              </p>
              <h3>第7条（利用制限および登録抹消）</h3>
              <p>
                当社は，ユーザーが以下のいずれかに該当する場合には，事前の通知なく，ユーザーに対して，本サービスの全部もしくは一部の利用を制限し，またはユーザーとしての登録を抹消することができるものとします。
              </p>
              <ul>
                <li>本規約のいずれかの条項に違反した場合 登録事項に虚偽の事実があることが判明した場合</li>
                <li>料金等の支払債務の不履行があった場合 当社からの連絡に対し，一定期間返答がない場合</li>
                <li>本サービスについて，最終の利用から一定期間利用がない場合</li>
                <li>その他，当社が本サービスの利用を適当でないと判断した場合</li>
              </ul>
              当社は，本条に基づき当社が行った行為によりユーザーに生じた損害について，一切の責任を負いません。
              <h3>第8条（退会） </h3>ユーザーは，当社の定める退会手続により，本サービスから退会できるものとします。
              <h3>第9条（保証の否認および免責事項）</h3>
              <p>
                当社は，本サービスに事実上または法律上の瑕疵（安全性，信頼性，正確性，完全性，有効性，特定の目的への適合性，セキュリティなどに関する欠陥，エラーやバグ，権利侵害などを含みます。）がないことを明示的にも黙示的にも保証しておりません。
              </p>
              <p>
                当社は，本サービスに起因してユーザーに生じたあらゆる損害について、当社の故意又は重過失による場合を除き、一切の責任を負いません。ただし，本サービスに関する当社とユーザーとの間の契約（本規約を含みます。）が消費者契約法に定める消費者契約となる場合，この免責規定は適用されません。
              </p>
              <p>
                前項ただし書に定める場合であっても，当社は，当社の過失（重過失を除きます。）による債務不履行または不法行為によりユーザーに生じた損害のうち特別な事情から生じた損害（当社またはユーザーが損害発生につき予見し，または予見し得た場合を含みます。）について一切の責任を負いません。また，当社の過失（重過失を除きます。）による債務不履行または不法行為によりユーザーに生じた損害の賠償は，ユーザーから当該損害が発生した月に受領した利用料の額を上限とします。
              </p>
              <p>
                当社は，本サービスに関して，ユーザーと他のユーザーまたは第三者との間において生じた取引，連絡または紛争等について一切責任を負いません。
              </p>
              <h3>第10条（サービス内容の変更等）</h3>
              当社は，ユーザーへの事前の告知をもって、本サービスの内容を変更、追加または廃止することがあり、ユーザーはこれを承諾するものとします。
              <h3>第11条（利用規約の変更）</h3>
              <p>当社は以下の場合には、ユーザーの個別の同意を要せず、本規約を変更することができるものとします。</p>
              <ul>
                <li>本規約の変更がユーザーの一般の利益に適合するとき。</li>
                <li>
                  本規約の変更が本サービス利用契約の目的に反せず、かつ、変更の必要性、変更後の内容の相当性その他の変更に係る事情に照らして合理的なものであるとき。
                </li>
                <li>
                  当社はユーザーに対し、前項による本規約の変更にあたり、事前に、本規約を変更する旨及び変更後の本規約の内容並びにその効力発生時期を通知します。
                </li>
              </ul>
              <h3>第12条（個人情報の取扱い）</h3>
              当社は，本サービスの利用によって取得する個人情報については，当社「プライバシーポリシー」に従い適切に取り扱うものとします。
              <h3>第13条（通知または連絡）</h3>
              ユーザーと当社との間の通知または連絡は，当社の定める方法によって行うものとします。当社は,ユーザーから,当社が別途定める方式に従った変更届け出がない限り,現在登録されている連絡先が有効なものとみなして当該連絡先へ通知または連絡を行い,これらは,発信時にユーザーへ到達したものとみなします。
              <h3>第14条（権利義務の譲渡の禁止）</h3>
              ユーザーは，当社の書面による事前の承諾なく，利用契約上の地位または本規約に基づく権利もしくは義務を第三者に譲渡し，または担保に供することはできません。
              <h3>第15条（準拠法・裁判管轄）</h3> 本規約の解釈にあたっては，日本法を準拠法とします。
              本サービスに関して紛争が生じた場合には，当社の本店所在地を管轄する裁判所を専属的合意管轄とします。
              <br /> 以上
            </div>
          )}
        </Box>
      </Container>
    </>
  );
};

export default Term;
