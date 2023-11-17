import React, { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import ChatBot from "react-simple-chatbot";
import FlashCard from "../components/FlashCard";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

// const GPTPrompt = ({ steps, triggerNextStep, uploadedFile }) => {
const GPTPrompt = (props) => {
  console.log(props);
  const { steps, triggerNextStep, flashcards, setFlashcards, selectedFile } = props;
  // const GPTPrompt = ({ steps, triggerNextStep, uploadedFile }) => {
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  //   const [flashcards, setFlashcards] = useState([]);
  const [trigger, setTrigger] = useState(false);

  const triggerNext = () => {
    setTrigger(true);
    triggerNextStep();
  };

  useEffect(() => {

    const fetchData = async () => {
      const candidateDocument =
        "LayerZero: Trustless Omnichain Interoperability Protocol\n\nAbstract\n\nThe proliferation of blockchains has given developers a\nvariety of platforms on which to run their smart contracts based on application features and requirements for throughput, security, and cost. However, a consequence of this freedom is severe fragmentation; Each chain is isolated, forcing users to silo their liquidity and limiting options to move liquidity and state between walled ecosystems.\n\nThis paper presents LayerZero, the first trustless omnichain interoperability protocol, which provides a powerful, low level communication primitive upon which a diverse set of cross-chain applications can be built. Using this new primitive, developers can implement seamless inter-chain applications like a cross-chain DEX or multi-chain yield aggregator without having to rely on a trusted custodian or intermediate transactions. Simply put, LayerZero is the first system to trustlessly enable direct transactions across all chains. Allowing transactions to flow freely between chains provides opportunities for users to consolidate fragmented pockets of liquidity while also making full use of applications on separate chains. With LayerZero, we provide the network fabric underlying the fully-connected omnichain ecosystem of the future.\n\n1\n\nIntroduction\n\nAt the core of the blockchain concept are the three pillars of decentralization, transparency, and immutability. No single entity controls the blockchain, and actions on the blockchain are verifiable and irreversible. These pillars create a foundation upon which an entity can act without trusting any other entity. This trust guarantee is one reason why, for example, cryptocurrencies are enticing compared to fiat currency.\n\nIf all users and all applications coexisted in one unified blockchain, then this paper would conclude here. However, the utility of the blockchain has led to a proliferation of diverse applications, with unique intricacies and requirements. The demand for a diverse set of functionalities spurned the growth of specialized chains. Each of these chains has fostered immense growth in applications within its own ecosystem, but the isolation between these ecosystems has emerged as a key limit to adoption. Users and developers are forced to split time, resources, and liquidity between separate chains. A natural consequence of the sheer number of so-called Layer 1 blockchains (as many as 109 at the time of writing) is the need to extend the above-mentioned three pillars to envelope interactions across multiple chains simultaneously. One example of an in-demand interaction between chains is the transfer of tokens, which we discuss later in this section.\n\nIn blockchain parlance, the unit of work is a transaction, immutable and irrevocable. Transactions, collated into blocks, form the basis of security in a blockchain system. However, interactions across chains have traditionally required a third-party mechanism outside of the normal blockchain cryptosystem. In contrast, this paper describes the first messaging protocol upon which native cross-chain transactions are possible: LayerZero.\n\nTo illustrate the powerful communication primitive LayerZero provides, we look at the example of transferring tokens from one chain to another. Currently, to convert between tokens of two chains, a user must leverage either a centralized exchange or a cross-chain decentralized exchange (DEX) (also known as a cross-chain bridge), both of which require a compromise. In the case of a centralized exchange, the user must trust the exchange that is tracking deposits and funding withdrawals. This trust relationship is contrary to the fundamental trustlessness of blockchain consensus and lacks the security of an on-chain automated system. Using a DEX alleviates the trust problem by conducting the transfer on-chain, but existing DEX implementations involve converting the user token into a protocol-specific token that transits their intermediate consensus layer to achieve transaction consensus. This intermediate consensus layer, though usually implemented in a secure manner, does require the user to trust a side chain to facilitate the token transfer. As we show in this paper, this additional overhead is unnecessary. Despite heavy user demand, no solution has emerged that is both efficient, direct, while still preserving the core reason for using blockchains in the first place: trustlessness. Taking a step back, LayerZero’s direct cross-chain transactions gives developers the tools to build just that.\n\nIt is important to note that LayerZero and the exchanges described above operate at two different levels of the implementation stack. LayerZero is a communication primitive that enables diverse omnichain applications, whereas an exchange is one example of an application that would benefit from re-implementation on top of LayerZero. Section 2 outlines the blockchain technology landscape and explores the exchange example further.\n\nTo properly explain the capabilities of LayerZero and its role in the blockchain ecosystem, we first present a formalization of the fundamental communication primitive required to enable inter-chain transactions. We then describe how LayerZero provides this primitive in a trustless manner, thus preserving the security promise of the blockchain. LayerZero is the first trustless omnichain interoperability layer and supports messaging directly between both Layer 1 and Layer 2 chains.\n\nA cross-chain transaction between chains A and B consists of a transaction tA on A, a communication protocol between A and B, and a message m. The key idea underpinning LayerZero is that if two independent entities corroborate the validity of a transaction (in this case, tA) then chain B can be sure that tA is valid. Given two entities that do not collude, if one entity can produce a block header for the block containing tA on chain A, the other entity can independently produce the proof for tA on that block (transaction proof), and the header and transaction proof in fact agree, then the communication protocol can deliver m to the client on chain B with the guarantee that tA is stably committed on chain A. The LayerZero communication protocol guarantees that the transaction on the recipient chain will be paired with a valid, committed transaction on the sender chain without involving any intermediary chains. We achieve this by combining two independent entities: an Oracle that provides the block header and a Relayer that provides the proof associated with the aforementioned transaction.\n\nThe interface to LayerZero is a lightweight on-chain client, which we call the LayerZero Endpoint. One LayerZero Endpoint exists on each (supported) chain, and any chain with a LayerZero Endpoint can conduct cross-chain transactions involving any other chain with a LayerZero Endpoint. In essence, this creates a fully-connected network where every node has a direct connection to every other node. With minor boilerplate code, any blockchain is supported. Section 5 demonstrates this process through a case study in implementing LayerZero on the Ethereum blockchain.\n\nThe ability to perform cross-chain transactions directly with any other chain on the network opens the opportunity for a class of large-scale applications that were previously infeasible, such as cross-chain decentralized exchanges, multi-chain yield aggregators, and cross-chain lending. Section 6 examines several such applications in detail. Through LayerZero, users can freely move liquidity between chains, allowing for a single pool of liquidity to take part in multiple decentralized finance (DeFi) applications across different chains and ecosystems without having to go through third-party systems or intermediate tokens.\n\n2 Background\n\nTo lay the groundwork for LayerZero, we review relevant existing systems to illustrate why they fall short of meeting the demands of emerging applications. The discussion culminates in an in-depth explanation of the advantages in building a cross-chain exchange atop LayerZero.\n\nCurrent solutions include Layer 2 networks like Polygon which offers application-specific, Ethereum-compatible sidechains to address throughput and sovereignty challenges of Ethereum. But, unlike LayerZero, communication with Polygon requires using the complexities of its own protocol. Polkadot presents an open cross-chain ecosystem with parallel chains connected via a common relay chain for token and data flow. However, all communications must cross this relay chain and incur additional costs. THORChain and AnySwap DEXs use pairwise liquidity pools or an intermediate token for token transfers, adding overhead and complexity that is unnecessary with LayerZero's direct inter-chain communication.\n\nCosmos is a blockchain network technology that includes an Inter-Blockchain Communication (IBC) protocol built on Tendermint BFT and facilitates messaging between supported chains. But, IBC only provides direct communication between fast-finality chains and always runs a full on-chain light node, unlike LayerZero which is more general and does not require a light node or intermediate chains. Chainlink, a framework for building decentralized oracle networks, extends a smart contract’s tamperproof property to off-chain data sources and resources without requiring trust in any central entity. By leveraging the Chainlink framework, LayerZero protocol can ensure trustless delivery of messages between different chains.\n\n3 Valid Delivery\n\nThis section describes the fundamental properties of trustless inter-chain communication. To formally characterize the problem of validating a transaction on a different chain, we define the concept of valid delivery. Valid delivery is a communication primitive that enables cross-chain token transfer by providing the following guarantees:\n\n1. Every message sent over the network is coupled with a transaction on the sender-side chain.\n2. A message is delivered to the receiver if and only if the associated transaction is valid and has been committed on the sender-side chain.\n\nCentralized exchanges guarantee valid delivery by establishing a trust relationship with the user, but this approach is contradicted by the trustless nature of blockchain consensus and is also vulnerable to exchange compromises. Decentralized exchanges overcome this trust issue by handling transfers on-chain and often use intermediary tokens governed by their protocols. However, these solutions are not ideal due to their complexity and additional costs. The ideal solution for inter-chain transactions would be a single one-swap transaction between chains without involving any trusted middle entity, i.e., trustless valid delivery. LayerZero implements a generic messaging protocol that provides trustless valid delivery of arbitrary user data, enabling a variety of cross-chain applications.\n\n4 Design\n\nThe core of LayerZero is a communication protocol that provides trustless valid delivery. Our protocol is built on a series of components including LayerZero Endpoints, an Oracle, and a Relayer. The Endpoint's purpose is to allow the user to send a message using the LayerZero protocol backend, guaranteeing valid delivery.\n\nThe Oracle is a third-party service that reads block headers from one chain and sends them to another. The Relayer is an off-chain service similar to an Oracle but fetches the proof for a specified transaction. To ensure valid delivery, the only requirement is that for any message sent using LayerZero, the Oracle and Relayer must be independent of each other.\n\nThe LayerZero protocol involves multiple steps, including the construction of LayerZero packets, validation, and delivery. Through this protocol, a message is delivered by the Communicator to the user application if and only if the transaction proof for the associated transaction can be validated, ensuring valid delivery. LayerZero’s design eliminates the possibility of collusion between the Oracle and Relayer, providing trustless validated delivery.\n\nThe LayerZero Endpoint is implemented as a series of smart contracts on each chain in the LayerZero network and consists of four modules: Communicator, Validator, Network, and Libraries. The Libraries are auxiliary smart contracts that define communication for a specific chain. The Endpoint design allows for easy expansion to include new chains, making LayerZero a fully-connected network capable of orchestrating transactions between any pair of nodes. Due to its design, LayerZero Endpoints are also cost-effective to run on expensive Layer 1 chains.\n\n5 Case Study: LayerZero on EVM\n\nWe describe the details of how to implement support for running LayerZero on Ethereum Virtual Machines (EVMs). This includes adapting the LayerZero packet for EVM endpoints, ensuring transaction stability on the source chain, and implementing the LayerZero Endpoint as a series of smart contracts. For the Ethereum blockchain, a Library is implemented to handle EVM-specific LayerZero packet construction and transaction proof validation.\n\n6 Applications on LayerZero\n\nLayerZero enables a range of applications such as cross-chain DEXes that deal exclusively in native assets, multi-chain yield aggregators that can tap into yield opportunities across ecosystems, and multi-chain lending that allows users to take advantage of opportunities on chains where they do not hold assets. These applications utilize LayerZero for cross-chain transactions and are not limited to tokens but can include arbitrary user data.\n\n7 Conclusion\n\nLayerZero is the first trustless omnichain interoperability platform that does not require intermediate transactions. It enables valid delivery without costly cross-chain SMRs or intermediary tokens. LayerZero's protocol ensures trustless messaging, and its Endpoint design facilitates cost-effective operation on various blockchains, including expensive ones like Ethereum. With LayerZero, the blockchain community can develop new applications with seamless interoperability, connecting disparate blockchain ecosystems and enabling the free movement of liquidity, data, and ideas between chains.";

      try {
        const response = await fetch(
          "http://localhost:8000/api/prompt/summary",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              candidate_document: selectedFile,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const resultData = await response.json();
        console.log(resultData);

        setResult(resultData.response);
      } catch (error) {
        console.error("Error:", error.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchFlashcards = async () => {
      const candidateDocument =
        "LayerZero: Trustless Omnichain Interoperability Protocol\n\nAbstract\n\nThe proliferation of blockchains has given developers a\nvariety of platforms on which to run their smart contracts based on application features and requirements for throughput, security, and cost. However, a consequence of this freedom is severe fragmentation; Each chain is isolated, forcing users to silo their liquidity and limiting options to move liquidity and state between walled ecosystems.\n\nThis paper presents LayerZero, the first trustless omnichain interoperability protocol, which provides a powerful, low level communication primitive upon which a diverse set of cross-chain applications can be built. Using this new primitive, developers can implement seamless inter-chain applications like a cross-chain DEX or multi-chain yield aggregator without having to rely on a trusted custodian or intermediate transactions. Simply put, LayerZero is the first system to trustlessly enable direct transactions across all chains. Allowing transactions to flow freely between chains provides opportunities for users to consolidate fragmented pockets of liquidity while also making full use of applications on separate chains. With LayerZero, we provide the network fabric underlying the fully-connected omnichain ecosystem of the future.\n\n1\n\nIntroduction\n\nAt the core of the blockchain concept are the three pillars of decentralization, transparency, and immutability. No single entity controls the blockchain, and actions on the blockchain are verifiable and irreversible. These pillars create a foundation upon which an entity can act without trusting any other entity. This trust guarantee is one reason why, for example, cryptocurrencies are enticing compared to fiat currency.\n\nIf all users and all applications coexisted in one unified blockchain, then this paper would conclude here. However, the utility of the blockchain has led to a proliferation of diverse applications, with unique intricacies and requirements. The demand for a diverse set of functionalities spurned the growth of specialized chains. Each of these chains has fostered immense growth in applications within its own ecosystem, but the isolation between these ecosystems has emerged as a key limit to adoption. Users and developers are forced to split time, resources, and liquidity between separate chains. A natural consequence of the sheer number of so-called Layer 1 blockchains (as many as 109 at the time of writing) is the need to extend the above-mentioned three pillars to envelope interactions across multiple chains simultaneously. One example of an in-demand interaction between chains is the transfer of tokens, which we discuss later in this section.\n\nIn blockchain parlance, the unit of work is a transaction, immutable and irrevocable. Transactions, collated into blocks, form the basis of security in a blockchain system. However, interactions across chains have traditionally required a third-party mechanism outside of the normal blockchain cryptosystem. In contrast, this paper describes the first messaging protocol upon which native cross-chain transactions are possible: LayerZero.\n\nTo illustrate the powerful communication primitive LayerZero provides, we look at the example of transferring tokens from one chain to another. Currently, to convert between tokens of two chains, a user must leverage either a centralized exchange or a cross-chain decentralized exchange (DEX) (also known as a cross-chain bridge), both of which require a compromise. In the case of a centralized exchange, the user must trust the exchange that is tracking deposits and funding withdrawals. This trust relationship is contrary to the fundamental trustlessness of blockchain consensus and lacks the security of an on-chain automated system. Using a DEX alleviates the trust problem by conducting the transfer on-chain, but existing DEX implementations involve converting the user token into a protocol-specific token that transits their intermediate consensus layer to achieve transaction consensus. This intermediate consensus layer, though usually implemented in a secure manner, does require the user to trust a side chain to facilitate the token transfer. As we show in this paper, this additional overhead is unnecessary. Despite heavy user demand, no solution has emerged that is both efficient, direct, while still preserving the core reason for using blockchains in the first place: trustlessness. Taking a step back, LayerZero’s direct cross-chain transactions gives developers the tools to build just that.\n\nIt is important to note that LayerZero and the exchanges described above operate at two different levels of the implementation stack. LayerZero is a communication primitive that enables diverse omnichain applications, whereas an exchange is one example of an application that would benefit from re-implementation on top of LayerZero. Section 2 outlines the blockchain technology landscape and explores the exchange example further.\n\nTo properly explain the capabilities of LayerZero and its role in the blockchain ecosystem, we first present a formalization of the fundamental communication primitive required to enable inter-chain transactions. We then describe how LayerZero provides this primitive in a trustless manner, thus preserving the security promise of the blockchain. LayerZero is the first trustless omnichain interoperability layer and supports messaging directly between both Layer 1 and Layer 2 chains.\n\nA cross-chain transaction between chains A and B consists of a transaction tA on A, a communication protocol between A and B, and a message m. The key idea underpinning LayerZero is that if two independent entities corroborate the validity of a transaction (in this case, tA) then chain B can be sure that tA is valid. Given two entities that do not collude, if one entity can produce a block header for the block containing tA on chain A, the other entity can independently produce the proof for tA on that block (transaction proof), and the header and transaction proof in fact agree, then the communication protocol can deliver m to the client on chain B with the guarantee that tA is stably committed on chain A. The LayerZero communication protocol guarantees that the transaction on the recipient chain will be paired with a valid, committed transaction on the sender chain without involving any intermediary chains. We achieve this by combining two independent entities: an Oracle that provides the block header and a Relayer that provides the proof associated with the aforementioned transaction.\n\nThe interface to LayerZero is a lightweight on-chain client, which we call the LayerZero Endpoint. One LayerZero Endpoint exists on each (supported) chain, and any chain with a LayerZero Endpoint can conduct cross-chain transactions involving any other chain with a LayerZero Endpoint. In essence, this creates a fully-connected network where every node has a direct connection to every other node. With minor boilerplate code, any blockchain is supported. Section 5 demonstrates this process through a case study in implementing LayerZero on the Ethereum blockchain.\n\nThe ability to perform cross-chain transactions directly with any other chain on the network opens the opportunity for a class of large-scale applications that were previously infeasible, such as cross-chain decentralized exchanges, multi-chain yield aggregators, and cross-chain lending. Section 6 examines several such applications in detail. Through LayerZero, users can freely move liquidity between chains, allowing for a single pool of liquidity to take part in multiple decentralized finance (DeFi) applications across different chains and ecosystems without having to go through third-party systems or intermediate tokens.\n\n2 Background\n\nTo lay the groundwork for LayerZero, we review relevant existing systems to illustrate why they fall short of meeting the demands of emerging applications. The discussion culminates in an in-depth explanation of the advantages in building a cross-chain exchange atop LayerZero.\n\nCurrent solutions include Layer 2 networks like Polygon which offers application-specific, Ethereum-compatible sidechains to address throughput and sovereignty challenges of Ethereum. But, unlike LayerZero, communication with Polygon requires using the complexities of its own protocol. Polkadot presents an open cross-chain ecosystem with parallel chains connected via a common relay chain for token and data flow. However, all communications must cross this relay chain and incur additional costs. THORChain and AnySwap DEXs use pairwise liquidity pools or an intermediate token for token transfers, adding overhead and complexity that is unnecessary with LayerZero's direct inter-chain communication.\n\nCosmos is a blockchain network technology that includes an Inter-Blockchain Communication (IBC) protocol built on Tendermint BFT and facilitates messaging between supported chains. But, IBC only provides direct communication between fast-finality chains and always runs a full on-chain light node, unlike LayerZero which is more general and does not require a light node or intermediate chains. Chainlink, a framework for building decentralized oracle networks, extends a smart contract’s tamperproof property to off-chain data sources and resources without requiring trust in any central entity. By leveraging the Chainlink framework, LayerZero protocol can ensure trustless delivery of messages between different chains.\n\n3 Valid Delivery\n\nThis section describes the fundamental properties of trustless inter-chain communication. To formally characterize the problem of validating a transaction on a different chain, we define the concept of valid delivery. Valid delivery is a communication primitive that enables cross-chain token transfer by providing the following guarantees:\n\n1. Every message sent over the network is coupled with a transaction on the sender-side chain.\n2. A message is delivered to the receiver if and only if the associated transaction is valid and has been committed on the sender-side chain.\n\nCentralized exchanges guarantee valid delivery by establishing a trust relationship with the user, but this approach is contradicted by the trustless nature of blockchain consensus and is also vulnerable to exchange compromises. Decentralized exchanges overcome this trust issue by handling transfers on-chain and often use intermediary tokens governed by their protocols. However, these solutions are not ideal due to their complexity and additional costs. The ideal solution for inter-chain transactions would be a single one-swap transaction between chains without involving any trusted middle entity, i.e., trustless valid delivery. LayerZero implements a generic messaging protocol that provides trustless valid delivery of arbitrary user data, enabling a variety of cross-chain applications.\n\n4 Design\n\nThe core of LayerZero is a communication protocol that provides trustless valid delivery. Our protocol is built on a series of components including LayerZero Endpoints, an Oracle, and a Relayer. The Endpoint's purpose is to allow the user to send a message using the LayerZero protocol backend, guaranteeing valid delivery.\n\nThe Oracle is a third-party service that reads block headers from one chain and sends them to another. The Relayer is an off-chain service similar to an Oracle but fetches the proof for a specified transaction. To ensure valid delivery, the only requirement is that for any message sent using LayerZero, the Oracle and Relayer must be independent of each other.\n\nThe LayerZero protocol involves multiple steps, including the construction of LayerZero packets, validation, and delivery. Through this protocol, a message is delivered by the Communicator to the user application if and only if the transaction proof for the associated transaction can be validated, ensuring valid delivery. LayerZero’s design eliminates the possibility of collusion between the Oracle and Relayer, providing trustless validated delivery.\n\nThe LayerZero Endpoint is implemented as a series of smart contracts on each chain in the LayerZero network and consists of four modules: Communicator, Validator, Network, and Libraries. The Libraries are auxiliary smart contracts that define communication for a specific chain. The Endpoint design allows for easy expansion to include new chains, making LayerZero a fully-connected network capable of orchestrating transactions between any pair of nodes. Due to its design, LayerZero Endpoints are also cost-effective to run on expensive Layer 1 chains.\n\n5 Case Study: LayerZero on EVM\n\nWe describe the details of how to implement support for running LayerZero on Ethereum Virtual Machines (EVMs). This includes adapting the LayerZero packet for EVM endpoints, ensuring transaction stability on the source chain, and implementing the LayerZero Endpoint as a series of smart contracts. For the Ethereum blockchain, a Library is implemented to handle EVM-specific LayerZero packet construction and transaction proof validation.\n\n6 Applications on LayerZero\n\nLayerZero enables a range of applications such as cross-chain DEXes that deal exclusively in native assets, multi-chain yield aggregators that can tap into yield opportunities across ecosystems, and multi-chain lending that allows users to take advantage of opportunities on chains where they do not hold assets. These applications utilize LayerZero for cross-chain transactions and are not limited to tokens but can include arbitrary user data.\n\n7 Conclusion\n\nLayerZero is the first trustless omnichain interoperability platform that does not require intermediate transactions. It enables valid delivery without costly cross-chain SMRs or intermediary tokens. LayerZero's protocol ensures trustless messaging, and its Endpoint design facilitates cost-effective operation on various blockchains, including expensive ones like Ethereum. With LayerZero, the blockchain community can develop new applications with seamless interoperability, connecting disparate blockchain ecosystems and enabling the free movement of liquidity, data, and ideas between chains.";

      try {
        const response = await fetch(
          "http://localhost:8000/api/prompt/flashcards",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              candidate_document: selectedFile,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const resultData = await response.json();

        // Extract the JSON string from the response
        const jsonString = resultData.response.slice(7, -3);

        // Parse the JSON string to get the array of flashcards
        const flashcards = JSON.parse(jsonString);

        console.log(flashcards);

        // setResult(resultData.response);
        setFlashcards(flashcards);
      } catch (error) {
        console.error("Error:", error.message);
      } finally {
        setLoading(false);
      }
    };

    const wrapper = async () => {
      await fetchData();
      await fetchFlashcards();
    }

    wrapper();

    // triggerNext()
  }, []);
  //   }, [steps.query.value, uploadedFile]);

  const renderText = (inputText) => {
    return inputText.split("\n").map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };
  return (
    <div className="GPTPrompt" style={{ textAlign: "left", padding: "0 20px" }}>
      {!loading && <>{renderText(result)}</>}
      {!loading && (
        <div
          style={{
            textAlign: "center",
            marginTop: 20,
          }}
        >
          {!trigger && <button onClick={triggerNext}>Ask Again</button>}
        </div>
      )}
    </div>
  );
};

// const GPTPromptBaF = ({ steps, triggerNextStep, uploadedFile }) => {
const GPTPromptBaF = (props) => {
  // console.log(props)
  const { steps, triggerNextStep, selectedFile } = props;
  // const GPTPromptBaF = ({ steps, triggerNextStep, uploadedFile }) => {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState("");
  const [trigger, setTrigger] = useState(false);

  const triggerNext = () => {
    setTrigger(true);
    triggerNextStep();
  };

  useEffect(() => {
    const fetchData = async () => {
      const candidateDocument =
        "LayerZero: Trustless Omnichain Interoperability Protocol\n\nAbstract\n\nThe proliferation of blockchains has given developers a\nvariety of platforms on which to run their smart contracts based on application features and requirements for throughput, security, and cost. However, a consequence of this freedom is severe fragmentation; Each chain is isolated, forcing users to silo their liquidity and limiting options to move liquidity and state between walled ecosystems.\n\nThis paper presents LayerZero, the first trustless omnichain interoperability protocol, which provides a powerful, low level communication primitive upon which a diverse set of cross-chain applications can be built. Using this new primitive, developers can implement seamless inter-chain applications like a cross-chain DEX or multi-chain yield aggregator without having to rely on a trusted custodian or intermediate transactions. Simply put, LayerZero is the first system to trustlessly enable direct transactions across all chains. Allowing transactions to flow freely between chains provides opportunities for users to consolidate fragmented pockets of liquidity while also making full use of applications on separate chains. With LayerZero, we provide the network fabric underlying the fully-connected omnichain ecosystem of the future.\n\n1\n\nIntroduction\n\nAt the core of the blockchain concept are the three pillars of decentralization, transparency, and immutability. No single entity controls the blockchain, and actions on the blockchain are verifiable and irreversible. These pillars create a foundation upon which an entity can act without trusting any other entity. This trust guarantee is one reason why, for example, cryptocurrencies are enticing compared to fiat currency.\n\nIf all users and all applications coexisted in one unified blockchain, then this paper would conclude here. However, the utility of the blockchain has led to a proliferation of diverse applications, with unique intricacies and requirements. The demand for a diverse set of functionalities spurned the growth of specialized chains. Each of these chains has fostered immense growth in applications within its own ecosystem, but the isolation between these ecosystems has emerged as a key limit to adoption. Users and developers are forced to split time, resources, and liquidity between separate chains. A natural consequence of the sheer number of so-called Layer 1 blockchains (as many as 109 at the time of writing) is the need to extend the above-mentioned three pillars to envelope interactions across multiple chains simultaneously. One example of an in-demand interaction between chains is the transfer of tokens, which we discuss later in this section.\n\nIn blockchain parlance, the unit of work is a transaction, immutable and irrevocable. Transactions, collated into blocks, form the basis of security in a blockchain system. However, interactions across chains have traditionally required a third-party mechanism outside of the normal blockchain cryptosystem. In contrast, this paper describes the first messaging protocol upon which native cross-chain transactions are possible: LayerZero.\n\nTo illustrate the powerful communication primitive LayerZero provides, we look at the example of transferring tokens from one chain to another. Currently, to convert between tokens of two chains, a user must leverage either a centralized exchange or a cross-chain decentralized exchange (DEX) (also known as a cross-chain bridge), both of which require a compromise. In the case of a centralized exchange, the user must trust the exchange that is tracking deposits and funding withdrawals. This trust relationship is contrary to the fundamental trustlessness of blockchain consensus and lacks the security of an on-chain automated system. Using a DEX alleviates the trust problem by conducting the transfer on-chain, but existing DEX implementations involve converting the user token into a protocol-specific token that transits their intermediate consensus layer to achieve transaction consensus. This intermediate consensus layer, though usually implemented in a secure manner, does require the user to trust a side chain to facilitate the token transfer. As we show in this paper, this additional overhead is unnecessary. Despite heavy user demand, no solution has emerged that is both efficient, direct, while still preserving the core reason for using blockchains in the first place: trustlessness. Taking a step back, LayerZero’s direct cross-chain transactions gives developers the tools to build just that.\n\nIt is important to note that LayerZero and the exchanges described above operate at two different levels of the implementation stack. LayerZero is a communication primitive that enables diverse omnichain applications, whereas an exchange is one example of an application that would benefit from re-implementation on top of LayerZero. Section 2 outlines the blockchain technology landscape and explores the exchange example further.\n\nTo properly explain the capabilities of LayerZero and its role in the blockchain ecosystem, we first present a formalization of the fundamental communication primitive required to enable inter-chain transactions. We then describe how LayerZero provides this primitive in a trustless manner, thus preserving the security promise of the blockchain. LayerZero is the first trustless omnichain interoperability layer and supports messaging directly between both Layer 1 and Layer 2 chains.\n\nA cross-chain transaction between chains A and B consists of a transaction tA on A, a communication protocol between A and B, and a message m. The key idea underpinning LayerZero is that if two independent entities corroborate the validity of a transaction (in this case, tA) then chain B can be sure that tA is valid. Given two entities that do not collude, if one entity can produce a block header for the block containing tA on chain A, the other entity can independently produce the proof for tA on that block (transaction proof), and the header and transaction proof in fact agree, then the communication protocol can deliver m to the client on chain B with the guarantee that tA is stably committed on chain A. The LayerZero communication protocol guarantees that the transaction on the recipient chain will be paired with a valid, committed transaction on the sender chain without involving any intermediary chains. We achieve this by combining two independent entities: an Oracle that provides the block header and a Relayer that provides the proof associated with the aforementioned transaction.\n\nThe interface to LayerZero is a lightweight on-chain client, which we call the LayerZero Endpoint. One LayerZero Endpoint exists on each (supported) chain, and any chain with a LayerZero Endpoint can conduct cross-chain transactions involving any other chain with a LayerZero Endpoint. In essence, this creates a fully-connected network where every node has a direct connection to every other node. With minor boilerplate code, any blockchain is supported. Section 5 demonstrates this process through a case study in implementing LayerZero on the Ethereum blockchain.\n\nThe ability to perform cross-chain transactions directly with any other chain on the network opens the opportunity for a class of large-scale applications that were previously infeasible, such as cross-chain decentralized exchanges, multi-chain yield aggregators, and cross-chain lending. Section 6 examines several such applications in detail. Through LayerZero, users can freely move liquidity between chains, allowing for a single pool of liquidity to take part in multiple decentralized finance (DeFi) applications across different chains and ecosystems without having to go through third-party systems or intermediate tokens.\n\n2 Background\n\nTo lay the groundwork for LayerZero, we review relevant existing systems to illustrate why they fall short of meeting the demands of emerging applications. The discussion culminates in an in-depth explanation of the advantages in building a cross-chain exchange atop LayerZero.\n\nCurrent solutions include Layer 2 networks like Polygon which offers application-specific, Ethereum-compatible sidechains to address throughput and sovereignty challenges of Ethereum. But, unlike LayerZero, communication with Polygon requires using the complexities of its own protocol. Polkadot presents an open cross-chain ecosystem with parallel chains connected via a common relay chain for token and data flow. However, all communications must cross this relay chain and incur additional costs. THORChain and AnySwap DEXs use pairwise liquidity pools or an intermediate token for token transfers, adding overhead and complexity that is unnecessary with LayerZero's direct inter-chain communication.\n\nCosmos is a blockchain network technology that includes an Inter-Blockchain Communication (IBC) protocol built on Tendermint BFT and facilitates messaging between supported chains. But, IBC only provides direct communication between fast-finality chains and always runs a full on-chain light node, unlike LayerZero which is more general and does not require a light node or intermediate chains. Chainlink, a framework for building decentralized oracle networks, extends a smart contract’s tamperproof property to off-chain data sources and resources without requiring trust in any central entity. By leveraging the Chainlink framework, LayerZero protocol can ensure trustless delivery of messages between different chains.\n\n3 Valid Delivery\n\nThis section describes the fundamental properties of trustless inter-chain communication. To formally characterize the problem of validating a transaction on a different chain, we define the concept of valid delivery. Valid delivery is a communication primitive that enables cross-chain token transfer by providing the following guarantees:\n\n1. Every message sent over the network is coupled with a transaction on the sender-side chain.\n2. A message is delivered to the receiver if and only if the associated transaction is valid and has been committed on the sender-side chain.\n\nCentralized exchanges guarantee valid delivery by establishing a trust relationship with the user, but this approach is contradicted by the trustless nature of blockchain consensus and is also vulnerable to exchange compromises. Decentralized exchanges overcome this trust issue by handling transfers on-chain and often use intermediary tokens governed by their protocols. However, these solutions are not ideal due to their complexity and additional costs. The ideal solution for inter-chain transactions would be a single one-swap transaction between chains without involving any trusted middle entity, i.e., trustless valid delivery. LayerZero implements a generic messaging protocol that provides trustless valid delivery of arbitrary user data, enabling a variety of cross-chain applications.\n\n4 Design\n\nThe core of LayerZero is a communication protocol that provides trustless valid delivery. Our protocol is built on a series of components including LayerZero Endpoints, an Oracle, and a Relayer. The Endpoint's purpose is to allow the user to send a message using the LayerZero protocol backend, guaranteeing valid delivery.\n\nThe Oracle is a third-party service that reads block headers from one chain and sends them to another. The Relayer is an off-chain service similar to an Oracle but fetches the proof for a specified transaction. To ensure valid delivery, the only requirement is that for any message sent using LayerZero, the Oracle and Relayer must be independent of each other.\n\nThe LayerZero protocol involves multiple steps, including the construction of LayerZero packets, validation, and delivery. Through this protocol, a message is delivered by the Communicator to the user application if and only if the transaction proof for the associated transaction can be validated, ensuring valid delivery. LayerZero’s design eliminates the possibility of collusion between the Oracle and Relayer, providing trustless validated delivery.\n\nThe LayerZero Endpoint is implemented as a series of smart contracts on each chain in the LayerZero network and consists of four modules: Communicator, Validator, Network, and Libraries. The Libraries are auxiliary smart contracts that define communication for a specific chain. The Endpoint design allows for easy expansion to include new chains, making LayerZero a fully-connected network capable of orchestrating transactions between any pair of nodes. Due to its design, LayerZero Endpoints are also cost-effective to run on expensive Layer 1 chains.\n\n5 Case Study: LayerZero on EVM\n\nWe describe the details of how to implement support for running LayerZero on Ethereum Virtual Machines (EVMs). This includes adapting the LayerZero packet for EVM endpoints, ensuring transaction stability on the source chain, and implementing the LayerZero Endpoint as a series of smart contracts. For the Ethereum blockchain, a Library is implemented to handle EVM-specific LayerZero packet construction and transaction proof validation.\n\n6 Applications on LayerZero\n\nLayerZero enables a range of applications such as cross-chain DEXes that deal exclusively in native assets, multi-chain yield aggregators that can tap into yield opportunities across ecosystems, and multi-chain lending that allows users to take advantage of opportunities on chains where they do not hold assets. These applications utilize LayerZero for cross-chain transactions and are not limited to tokens but can include arbitrary user data.\n\n7 Conclusion\n\nLayerZero is the first trustless omnichain interoperability platform that does not require intermediate transactions. It enables valid delivery without costly cross-chain SMRs or intermediary tokens. LayerZero's protocol ensures trustless messaging, and its Endpoint design facilitates cost-effective operation on various blockchains, including expensive ones like Ethereum. With LayerZero, the blockchain community can develop new applications with seamless interoperability, connecting disparate blockchain ecosystems and enabling the free movement of liquidity, data, and ideas between chains.";

      const msg = steps.msg.value;

      try {
        const response = await fetch(
          "http://localhost:8000/api/prompt/summary-question",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              candidate_document: selectedFile,
              message: msg,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const resultData = await response.json();
        console.log(resultData);
        // console.log(printParagraphs(resultData.response));

        setResult(resultData.reply);
      } catch (error) {
        console.error("Error:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    // triggerNext()
  }, []);
  //   }, [steps.query.value, uploadedFile]);

  const renderText = (inputText) => {
    return inputText.split("\n").map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };
  return (
    <div
      className="GPTPromptBaF"
      style={{ textAlign: "left", padding: "0 20px" }}
    >
      {!loading && (
        <>
          {renderText(result)}
          {/* // {result} */}
        </>
      )}
      {!loading && (
        <div
          style={{
            textAlign: "center",
            marginTop: 20,
          }}
        >
          {!trigger && <button onClick={triggerNext}>Ask Again</button>}
        </div>
      )}
    </div>
  );
};

const SummarizerPage = () => {
  const location = useLocation();
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadedText, setUploadedText] = useState("");
  const [flashcards, setFlashcards] = useState([]);

  useEffect(() => {
    if (location.state && location.state.file) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(location.state.file);
      fileReader.onload = (e) => {
        setUploadedFile(e.target.result);
      };
      setUploadedText(location.state.data.text)
    }
    // console.log(location.state.data)
    // console.log(location.state.data.text)
    // console.log(uploadedText)
  }, [location]);

  const steps = [
    {
      id: "1",
      // TODO: Format messages/workflow as deemed appropriate
      message:
        "Hello! I am a bot here to help you with summarizing your documents.",
      trigger: "2",
    },
    {
      id: "2",
      component: (
        <span>
          Here are some sample questions you can ask the bot!
          <br />
          1. Summarize the class document.
          <br />
          2. Discuss the pros and cons of the topic of the class document.
          <br />
          3. Would you support the position presented in the document?
        </span>
      ),
      asMessage: true,
      trigger: "3",
      //   trigger: "3",
    },
    {
      id: "3",
      component: (
        <span>
          Below is an initial summary of the attached document.
          <br />
          To the left are 10 Q&A styled flashcards!
        </span>
      ),
      asMessage: true,
      trigger: "summary",
    },
    // Hit GPT endpoint
    {
      id: "summary",
      component: (
        <GPTPrompt flashcards={flashcards} setFlashcards={setFlashcards} selectedFile={location.state.data.text}/>
      ),
      asMessage: true,
      waitAction: true,
      trigger: "5",
    },
    {
      id: "5",
      message: "Anything else I can help you with today?",
      trigger: "6",
    },
    {
      id: "6",
      options: [
        { value: 1, label: "Yes", trigger: "7" },
        { value: 2, label: "No", trigger: "9" },
      ],
    },
    {
      id: "7",
      message: "Go ahead with any other questions you have!",
      trigger: "msg",
    },
    // User input/question/prompt for GPT
    {
      id: "msg",
      user: true,
      trigger: "query2",
    },
    // Hit GPT endpoint
    {
      id: "query2",
      component: <GPTPromptBaF selectedFile={location.state.data.text}/>,
      asMessage: true,
      waitAction: true,
      trigger: "5",
    },
    {
      id: "9",
      message: "Thank you for using Scholarly!",
      end: true,
    },
  ];

  const customStyle = {
    userBubble: {
      height: "85%",
    },
  };

  const theme = {
    background: "#ede8e4",
    fontFamily: "Arial, Helvetica, sans-serif",
    headerBgColor: "#3EB489",
    headerFontColor: "#fff",
    headerFontSize: "15px",
    botBubbleColor: "#3EB489",
    botFontColor: "#fff",
    userBubbleColor: "#6F9CDE",
    userFontColor: "#fff",
    bubbleStyle: {
      textAlign: "left",
      maxHeight: "100%",
      maxWidth: "100%",
      padding: "10px",
    },
  };

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div
      className="App"
      style={{
        display: "flex",
        flexDirection: "row",
        height: "100vh",
        backgroundColor: "white",
        padding: "20px",
      }}
    >
      <div
        className="background-image"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')", // Add the URL of your background image
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: 0.8,
        }}
      />
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 1,
        }}
      >
        <Typography
          variant="h4"
          style={{
            marginBottom: "12px",
            marginRight: "auto",
            maxWidth: "fit-content",
            fontFamily: "cursive",
            color: "white",
            fontWeight: "bolder",
            boxShadow: "0 0 20px 0 rgba(0, 0, 0, 1)",
            borderRadius: "12px",
            backgroundColor: "#3EB489",
            lineHeight: 1.4,
            letterSpacing: 2,
          }}
        >
          Scholarly - Learning!
        </Typography>
        <div style={{ overflowY: "scroll", height: "80vh", width: "90%" }}>
          {uploadedFile && (
            <iframe
              src={uploadedFile}
              style={{ width: "100%", height: "100%" }}
              title="PDF Viewer"
            ></iframe>
          )}
        </div>
        {flashcards && flashcards.length > 0 && (
          <div
            style={{
              height: "20vh",
              width: "100%",
              marginTop: "20px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FlashCard
              questionContent={flashcards[activeStep].question}
              answerContent={flashcards[activeStep].answer}
            />
            <MobileStepper
              variant="progress"
              steps={flashcards.length}
              position="static"
              activeStep={activeStep}
              sx={{
                width: "100%",
                backgroundColor: "transparent",
                marginTop: "10px",
              }}
              nextButton={
                <Button
                  style={{ fontWeight: "bolder" }}
                  size="large"
                  onClick={handleNext}
                  disabled={activeStep === flashcards.length - 1}
                >
                  Next
                </Button>
              }
              backButton={
                <Button
                  style={{ fontWeight: "bolder" }}
                  size="large"
                  onClick={handleBack}
                  disabled={activeStep === 0}
                >
                  Back
                </Button>
              }
            />
          </div>
        )}
      </div>
      <div style={{ flex: 1, padding: "10px", height: "100vh" }}>
        <ThemeProvider theme={theme}>
          {" "}
          <ChatBot
            steps={steps}
            style={{ height: "100vh", width: "100%" }}
            contentStyle={customStyle.userBubble}
            bubbleStyle={theme.bubbleStyle}
          />{" "}
        </ThemeProvider>
      </div>
    </div>
  );
};

export default SummarizerPage;
