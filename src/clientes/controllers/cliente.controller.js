import ClienteModel from "../models/cliente.model.js";

class ClienteController {
  static async criarCliente(req, res) {
    try {
      const { nome, email, telefone, endereco } = req.body;
      if (!nome || !email || !telefone || !endereco) {
        return res
          .status(400)
          .json({ msg: "Todos os campos devem ser preenchidos." });
      }

      const novoUsuario = await ClienteModel.create({
        nome,
        email,
        telefone,
        endereco,
      });
      res
        .status(201)
        .json({ msg: "Usuário criado com sucesso!", cliente: novoUsuario });
    } catch (error) {
      res
        .status(500)
        .json({ msg: "Erro interno do servidor.", error: error.message });
    }
  }

  static async listarClientes(req, res) {
    try {
      const clientes = await ClienteModel.findAll();
      if (clientes === 0) {
        return res.status(400).json({ msg: "Nenhum usuário encontrado." });
      }
      res.status(200).json(clientes);
    } catch (error) {
      res
        .status(500)
        .json({ msg: "Erro interno do servidor.", error: error.message });
    }
  }

  static async atualizarCliente(req, res) {
    try {
      const id = req.params.id;
      const procurandoCliente = await ClienteModel.findByPk(id);
      if (procurandoCliente === 0) {
        return res
          .status(400)
          .json({ msg: "Cliente não encontrado", error: error.message });
      }

      const { nome, email, telefone, endereco } = req.body;
      const clienteEditado = await ClienteModel.update(
        { nome, email, telefone, endereco },
        { where: { id } }
      );
      res.status(201).json({ msg: "Cliente atualizado com sucesso" });
    } catch (error) {
      res
        .status(400)
        .json({ msg: "Cliente não encontrado.", error: error.message });
    }
  }

  static async excluirCliente(req, res) {
    try {
      const id = req.params.id;
      const usuarioDeletado = await ClienteModel.destroy({ where: { id } });
      if (usuarioDeletado === 0) {
        return res
          .status(400)
          .json({ msg: "Cliente não encontrado", error: error.message });
      }

      res.status(200).json({ msg: "Usuário deletado com sucesso." });
    } catch (error) {
      res
        .status(500)
        .json({ msg: "Erro interno do servidor.", error: error.message });
    }
  }
}

export default ClienteController;
